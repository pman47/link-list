import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/dbConnect";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addDays,
  differenceInDays,
  formatISO9075,
  isToday,
  parseISO,
} from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  await DBConnect();

  const page = (await Page.findOne({
    owner: session?.user?.email!,
  })) as PageType;

  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const allDatesGroupedViews: { _id: string; count: string | number }[] = [];

  groupedViews.forEach(({ _id, count }, index) => {
    allDatesGroupedViews.push({
      _id,
      count,
    });
    const date = _id;
    const nextDate = groupedViews?.[index + 1]?._id;
    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));
      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = addDays(parseISO(date), i);
          allDatesGroupedViews.push({
            _id: formatISO9075(dateBetween, { representation: "date" }),
            count: 0,
          });
        }
      }
    }
  });

  const clicks = await Event.find({ page: page.uri, type: "click" });

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={allDatesGroupedViews}
          xAxisKey="_id"
          xAxisLinesKeys={["count"]}
        />
      </SectionBox>
      <SectionBox>
        {/* {JSON.stringify(clicks)} */}
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map((link: Link) => {
          const todaysViews = clicks.filter(
            (c) => c.uri === link.url && isToday(c.createdAt)
          ).length;
          const totalViews = clicks.filter((c) => c.uri === link.url).length;

          return (
            <div
              className="flex gap-4 items-center border-t border-gray-200 py-4"
              key={link.key}
            >
              <div className="text-blue-500 pl-4">
                <FontAwesomeIcon icon={faLink} className="h-6 w-6" />
              </div>
              <div className="grow">
                <h3>{link.title || "no title"}</h3>
                <p className="text-gray-500 text-sm">
                  {link.subtitle || "no description"}
                </p>
                <a
                  href={link.url}
                  target="_blank"
                  className="text-blue-400 text-xs"
                >
                  {link.url}
                </a>
              </div>
              <div className="text-center">
                <div className="border p-2 rounded-md">
                  <div className="text-3xl">{todaysViews}</div>
                  <div className="text-gray-400 text-xs uppercase font-bold ">
                    clicks today
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="border p-2 rounded-md">
                  <div className="text-3xl">{totalViews}</div>
                  <div className="text-gray-400 text-xs uppercase font-bold ">
                    clicks total
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </SectionBox>
    </div>
  );
};

export default page;
