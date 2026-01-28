"use client";
import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

// Suppress Agora SDK console logs - we handle errors gracefully ourselves
if (typeof window !== "undefined") {
  try {
    // Set log level to NONE (4) to suppress all SDK logs
    // Camera errors are handled gracefully in our try-catch blocks
    AgoraRTC.setLogLevel(4); // 0: DEBUG, 1: INFO, 2: WARNING, 3: ERROR, 4: NONE
  } catch (e) {
    // Ignore if setLogLevel is not available in this SDK version
  }
}

export function useAgora({ appId, token, channelName, uid }) {
  const [isJoined, setIsJoined] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);

  const clientRef = useRef(null);
  const localVideoElementRef = useRef(null);
  const remoteVideoElementsRef = useRef({});

  useEffect(() => {
    if (!appId || !token || !channelName) return;

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    clientRef.current = client;

    let videoTrack = null;
    let audioTrack = null;

    const joinChannel = async () => {
      try {
        // Join the channel
        await client.join(appId, channelName, token, uid);

        // Try to create video track, but allow audio-only if camera is unavailable
        try {
          videoTrack = await AgoraRTC.createCameraVideoTrack();
          setLocalVideoTrack(videoTrack);
          setIsVideoEnabled(true);

          // Play local video
          if (localVideoElementRef.current) {
            videoTrack.play(localVideoElementRef.current);
          }
        } catch (videoError) {
          // Handle camera errors gracefully - allow audio-only calls
          // Check if it's a camera-related error
          const isCameraError = 
            videoError?.code === "NOT_READABLE" ||
            videoError?.name === "NotReadableError" ||
            videoError?.message?.includes("video source") ||
            videoError?.message?.includes("camera") ||
            videoError?.message?.includes("Could not start video");
          
          if (isCameraError) {
            // Silently continue with audio-only - this is expected behavior
            videoTrack = null;
            setLocalVideoTrack(null);
            setIsVideoEnabled(false);
          } else {
            // Log other unexpected errors
            console.error("Unexpected video track error:", videoError);
            videoTrack = null;
            setLocalVideoTrack(null);
            setIsVideoEnabled(false);
          }
        }

        // Create audio track
        try {
          audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          setLocalAudioTrack(audioTrack);
          setIsAudioEnabled(true);
        } catch (audioError) {
          console.error("Microphone not available:", audioError);
          audioTrack = null;
          setLocalAudioTrack(null);
          setIsAudioEnabled(false);
        }

        // Publish only the tracks that were successfully created
        const tracksToPublish = [];
        if (videoTrack) tracksToPublish.push(videoTrack);
        if (audioTrack) tracksToPublish.push(audioTrack);

        if (tracksToPublish.length > 0) {
          await client.publish(tracksToPublish);
        }

        setIsJoined(true);

        // Handle remote users
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            const remoteUser = {
              uid: user.uid,
              videoTrack: user.videoTrack,
              audioTrack: user.audioTrack,
            };
            setRemoteUsers((prev) => {
              if (prev.find((u) => u.uid === user.uid)) return prev;
              return [...prev, remoteUser];
            });

            // Play remote video after a short delay to ensure element exists
            setTimeout(() => {
              if (remoteVideoElementsRef.current[user.uid]) {
                user.videoTrack?.play(remoteVideoElementsRef.current[user.uid]);
              }
            }, 100);
          }

          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        });

        client.on("user-unpublished", (user, mediaType) => {
          if (mediaType === "video") {
            setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
            delete remoteVideoElementsRef.current[user.uid];
          }
        });

        client.on("user-left", (user) => {
          setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
          delete remoteVideoElementsRef.current[user.uid];
        });
      } catch (error) {
        console.error("Error joining channel:", error);
      }
    };

    joinChannel();

    return () => {
      // Cleanup
      if (videoTrack) {
        videoTrack.stop();
        videoTrack.close();
      }
      if (audioTrack) {
        audioTrack.stop();
        audioTrack.close();
      }
      if (client) {
        client.leave();
      }
      setLocalVideoTrack(null);
      setLocalAudioTrack(null);
      setIsJoined(false);
      setRemoteUsers([]);
    };
  }, [appId, token, channelName, uid]);

  const toggleVideo = async () => {
    if (localVideoTrack) {
      const newState = !isVideoEnabled;
      await localVideoTrack.setEnabled(newState);
      setIsVideoEnabled(newState);
    }
  };

  const toggleAudio = async () => {
    if (localAudioTrack) {
      const newState = !isAudioEnabled;
      await localAudioTrack.setEnabled(newState);
      setIsAudioEnabled(newState);
    }
  };

  const leaveChannel = async () => {
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
      setLocalVideoTrack(null);
    }
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
      setLocalAudioTrack(null);
    }
    if (clientRef.current) {
      await clientRef.current.leave();
    }
    setIsJoined(false);
    setRemoteUsers([]);
    remoteVideoElementsRef.current = {};
  };

  return {
    isJoined,
    isVideoEnabled,
    isAudioEnabled,
    remoteUsers,
    localVideoElementRef,
    remoteVideoElementsRef,
    toggleVideo,
    toggleAudio,
    leaveChannel,
  };
}
