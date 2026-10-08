export type ShareTarget = {
  label: string;
  href: string;
};

export function shareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}): ShareTarget[] {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  return [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];
}
