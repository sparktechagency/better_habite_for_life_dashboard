"use client";
import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

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

        // Create and publish local tracks
        videoTrack = await AgoraRTC.createCameraVideoTrack();
        audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

        setLocalVideoTrack(videoTrack);
        setLocalAudioTrack(audioTrack);

        // Play local video
        if (localVideoElementRef.current) {
          videoTrack.play(localVideoElementRef.current);
        }

        // Publish tracks
        await client.publish([videoTrack, audioTrack]);

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
