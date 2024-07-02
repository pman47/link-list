import {
    faDiscord,
    faFacebook,
    faGithub,
    faInstagram,
    faTelegram,
    faWhatsapp,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faMobile
} from "@fortawesome/free-solid-svg-icons";

export const allButtons: Button[] = [
  {
    key: "email",
    label: "E-mail",
    icon: faEnvelope,
    placeholder: "demo@gmail.com",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: faMobile,
    placeholder: "+91 12345-67890",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/profile/...",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/profile/...",
  },
  {
    key: "discord",
    label: "Discord",
    icon: faDiscord,
    placeholder: "https://discord.com/invite/...",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: faYoutube,
    placeholder: "https://youtube.com/channel/...",
  },
  {
    key: "github",
    label: "GitHub",
    icon: faGithub,
    placeholder: "https://github.com/username",
  },
  {
    key: "whatsapp",
    label: "Whatsapp",
    icon: faWhatsapp,
    placeholder: "+91 12345-67890",
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: faTelegram,
    placeholder: "https://telegram.me/username",
  },
];
