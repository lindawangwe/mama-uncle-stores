import {
  BellPlus,
  ChevronDown,
  ChevronUp,
  Cog,
  Gem,
  HandCoins,
  HandHeart,
  Home,
  PocketKnifeIcon,
  Split,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "../contexts/SideBarContexts";
import { NavbarFirst } from "../components/Navbar";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      {isSmallOpen && (
        <aside
          className={`fixed z-30 top-20 left-0 overflow-y-auto bg-teal-700 scrollbar-hidden
              pb-4 flex flex-col  w-16  ${
                isLargeOpen ? "lg:hidden " : "lg:flex"
              }`}
        >
          <SmallSidebarItem Icon={Home} title="Home" url="/" />
          <SmallSidebarItem Icon={HandCoins} title="Offers" url="/offers" />
          <SmallSidebarItem Icon={Split} title="Brands" url="/brands" />
        </aside>
      )}
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-60"
        ></div>
      )}

      {(isLargeOpen || isSmallOpen) && (
        <aside
          className={` w-56 lg:sticky absolute top-20 left-0 bg-teal-700 
                                overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 ${
                                  isLargeOpen ? "lg:flex" : "hidden"
                                } ${
            isSmallOpen ? "flex z-[999] bg-amber-300 max-h-screen" : "hidden"
          } `}
        >
          <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0">
            <NavbarFirst />
          </div>
          <LargeSidebarSection visibleItemCount={1}>
            <LargeSidebarItem
              isActive
              IconOrImgUrl={Home}
              title="Home"
              url="/"
            />
            <LargeSidebarItem
              IconOrImgUrl={HandHeart}
              title="Deals"
              url="/deals"
            />
          </LargeSidebarSection>
          <hr />
          <LargeSidebarSection>
            <LargeSidebarItem
              IconOrImgUrl={BellPlus}
              title="new"
              url="/new arrivals"
            />
            <LargeSidebarItem IconOrImgUrl={Gem} title="recent" url="/recent" />
          </LargeSidebarSection>
          <hr />
          <LargeSidebarSection title="Shop by brands" visibleItemCount={5}>
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Kabras"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Mumias"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Nutrameal"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Fahari"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Baraka"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Jamaa"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Menengai"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="MtKenya"
              url="/new arrivals"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Molo"
              url="/new arrivals"
            />
          </LargeSidebarSection>
          <hr />
          <LargeSidebarSection title="Help and Settings">
            <LargeSidebarItem
              IconOrImgUrl={Cog}
              title="Payments"
              url="/payments"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="FAQ"
              url="/FAQ "
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="contact info"
              url="/contacts"
            />
            <LargeSidebarItem
              IconOrImgUrl={PocketKnifeIcon}
              title="Delivery"
              url="/delivery"
            />
          </LargeSidebarSection>
        </aside>
      )}
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat(); //1 dimensional array
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "show less" : "show more"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3
    ${isActive ? "font-bold bg-amber-200 hover:bg-amber-400" : undefined}`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={url} className="w-6 h-6 rounded-lg" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
