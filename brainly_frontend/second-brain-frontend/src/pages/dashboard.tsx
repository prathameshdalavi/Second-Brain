import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../components/icons";
import { ShareIcon } from "../components/icons";
import { SideBar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";
import { ShareContent } from "../components/shareContent";
export function Dashboard() {
  const [openModel, setOpenModel] = useState(false);
  const [openShareContent, setOpenShareContent] = useState(false);
  const { content, refresh } = useContent();
  useEffect(() => {
    refresh();
  }, [openModel, openShareContent]);
  return (
      <div className="flex bg-violet-50" >
        <div>
          <SideBar />
        </div>
        <div className=" w-full min-h-screen bg-violet-50">
          <CreateContentModel open={openModel} onClose={() => setOpenModel(false)} />
          <ShareContent
          open={openShareContent}  // Control ShareContent modal visibility
          onCloseShare={() => setOpenShareContent(false)}  // Close ShareContent onClose
        />
          <div className="pt-5 pl-4 text-3xl font-bold text-violet-600">
            All Contents
          </div>
          <div className="flex justify-end p-10 gap-2">
            <Button onClick={() => setOpenShareContent(true)}  variant="secondary" size="md" text="Share Brain" starticon={<ShareIcon />} />
            <Button onClick={() => setOpenModel(true)} variant="primary" size="md" text="Add Content" starticon={<PlusIcon />} />
          </div>
          <div className="gap-4 p-4 space-y-4 columns-1 sm:columns-1 md:columns-2 lg:columns-2 xl:columns-3">
            {content.map(({ type, link, title, _id }, index) => (
              <Card
                key={index}
                type={type}
                link={link}
                title={title}
                contentId={_id}
              />
            ))}

          </div>
        </div>
      </div>
  );
}

