import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../components/icons";
import { ShareIcon } from "../components/icons";
import { SideBar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";

export function Dashboard() {
  const [openModel, setOpenModel] = useState(false);
  const {content,refresh}= useContent();
  useEffect(() => {
    refresh();
  }, [openModel])
  return (
    <div>

      <CreateContentModel open={openModel} onClose={() => setOpenModel(false)}/>

      <div className="flex" >
        <div>
          <SideBar />
        </div>
        <div className="w-full h-screen bg-violet-50">
          <div className="flex justify-end p-10  gap-2">
            <Button variant="secondary" text="Share Brain" size="md" starticon={<ShareIcon />} />
            <Button onClick={() => setOpenModel(true)} variant="primary" text="Add Content" size="md" starticon={<PlusIcon />} />
          </div>
          <div className="flex gap-4 pl-10 pr-10 pt-5">
            {/* <Card type="twitter" title="First tweet" link="https://x.com/kirat_tw/status/1633685473821425666" /> */}
            {/* <Card type="twitter" title="First tweet" link="https://x.com/ShraddhaKapoor/status/1564951310792658951" />
            // <Card type="youtube" title="First video" link="https://www.youtube.com/watch?v=OmzCvb-QBak" /> */}
            {content.map(({type, link, title}, index) => (
            <Card 
                key={index}
                type={type} 
                link={link} 
                title={title} 
            />
          ))}

          </div>
        </div>

      </div>
    </div>
  );
}

