import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

function CardComponent({
  title,
  value,
  icon,
  status,
  goto,
  underline,
  footer,
  iconTextColor = "text-gray-500",
  iconBgColor = "bg-gray-100",
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <CardDescription className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </CardDescription>
          <CardAction
            className={`p-3 rounded-lg ${iconBgColor} ${iconTextColor} inline-block w-fit mt-4`}
          >
            {icon}
          </CardAction>
        </CardHeader>
        {footer && (
          <CardFooter className="pt-0">
            {status && <p className="text-sm text-gray-500">{status}</p>}
            {goto && (
              <p
                className={`${underline
                    ? "text-sm underline cursor-pointer text-blue-600"
                    : "text-sm"
                  }`}
              >
                {goto}
              </p>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default CardComponent;

export const CardSection = ({ cards, footer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards?.map((card, index) => (
        <CardComponent key={index} {...card} footer={footer} />
      ))}
    </div>
  );
};