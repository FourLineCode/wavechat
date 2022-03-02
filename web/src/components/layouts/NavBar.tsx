import Image from "next/image";
import Link from "next/link";
import {
    DiscordLogo,
    FacebookLogo,
    GithubLogo,
    InstagramLogo,
    RedditLogo,
    TwitchLogo,
    TwitterLogo,
} from "phosphor-react";
import toast from "react-hot-toast";
import { Button } from "src/components/ui/Button";
import { IconButton } from "src/components/ui/IconButon";
import { IconLink } from "src/components/ui/IconLink";
import { Modal } from "src/components/ui/Modal";
import { useModal } from "src/hooks/useModal";
import { config } from "src/internal/config";

export function NavBar() {
    const aboutModal = useModal();

    return (
        <div className="flex justify-between w-full h-16 px-16 pt-12 lg:px-48">
            <Link passHref href="/">
                <div className="flex items-center cursor-pointer">
                    <Image src={config.iconUrl} alt="logo" height="40" width="60" />
                    <div className="ml-2 text-3xl italic font-bold">
                        <span>Wave</span>
                        <span className="underline">Chat</span>
                    </div>
                    <div className="uppercase bg-brand-500 rounded-md py-0.5 px-1 ml-2 text-xs">
                        BETA
                    </div>
                </div>
            </Link>
            <div className="flex space-x-4 font-medium text-md">
                <div onClick={aboutModal.onOpen} className="cursor-pointer hover:underline ">
                    About
                </div>
                <Link
                    passHref
                    href={
                        "https://mail.google.com/mail/?view=cm&fs=1&to=akmal3535.ah@gmail.com&su=%23Issue@Wavechat:&body=Your%20Issue%20Here"
                    }
                >
                    <a target="_blank" className="hover:underline">
                        Contact
                    </a>
                </Link>
            </div>
            <Modal large {...aboutModal} className="overflow-y-auto">
                <div className="mb-2 text-2xl font-semibold text-center">About this app</div>
                <div className="space-y-2">
                    <div>
                        WaveChat is a real time social media application made for college/university
                        students. In the recent couple years, the covid-19 pandemic has changed how
                        students of all level interact with each other. It has been really tough for
                        students to meet new people and make friends over the internet. This app was
                        made for students to find other students of similar interest and make new
                        friends. It also makes it easy for students of a certain course or section
                        to communicate with each other about their activities and help each other.
                    </div>
                    <div>
                        This app was built by{" "}
                        <a
                            target="_blank"
                            className="text-brand-500 hover:underline"
                            href="https://github.com/FourLineCode"
                        >
                            Akmal Hossain
                        </a>
                        , a Computer Science & Engineering student at{" "}
                        <a
                            target="_blank"
                            className="text-brand-500 hover:underline"
                            href="https://ewubd.edu"
                        >
                            East West University
                        </a>
                        . This is an open source project as of right now. You can find out more
                        about this project on the github{" "}
                        <a
                            target="_blank"
                            className="text-brand-500 hover:underline"
                            href="https://github.com/FourLineCode/wavechat"
                        >
                            public repository
                        </a>{" "}
                        .
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-1">
                        <IconLink
                            icon={<GithubLogo weight="fill" size={24} />}
                            href="https://github.com/FourLineCode"
                        />
                        <IconLink
                            icon={<TwitterLogo weight="fill" size={24} />}
                            href="https://twitter.com/FourLineCode"
                        />
                        <IconLink
                            icon={<FacebookLogo weight="fill" size={24} />}
                            href="https://facebook.com/FourLineCode"
                        />
                        <IconLink
                            icon={<InstagramLogo weight="fill" size={24} />}
                            href="https://instagram.com/FourLineCode"
                        />
                        <IconLink
                            icon={<TwitchLogo weight="fill" size={24} />}
                            href="https://twitch.tv/FourLineCode"
                        />
                        <IconLink
                            icon={<RedditLogo weight="fill" size={24} />}
                            href="https://reddit.com/user/FourLineCode"
                        />
                        <IconButton
                            icon={<DiscordLogo weight="fill" size={24} />}
                            onClick={() =>
                                toast(() => (
                                    <div className="flex items-center space-x-2">
                                        <DiscordLogo size={24} weight="fill" />
                                        <span className="font-semibold">FourLineCode</span>
                                        <span>#4242</span>
                                    </div>
                                ))
                            }
                        />
                    </div>
                    <Button variant="outlined" onClick={aboutModal.onClose}>
                        Close
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
