// 타입 정의
export type Guest = {
    name: string;
    image: string;
    appearances: number;
    youtubeLinks: string[];
  };
  
  // 더미 데이터
  export const guests: Guest[] = [
    {
      name: "유재석",
      image: "/stickers/yoojaeseok.png",
      appearances: 6,
      youtubeLinks: [
        "https://www.youtube.com/watch?v=m9m_eHVEGYA&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=113",
        "https://www.youtube.com/watch?v=HsnXd-qK1KY&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=112",
        "https://www.youtube.com/watch?v=O_ri_EHavSo&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=111",
        "https://www.youtube.com/watch?v=xQjkPhVgvRo&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=110",
        "https://www.youtube.com/watch?v=W7uLhS9qfis&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=109",
        "https://www.youtube.com/watch?v=W7h5exjKWZ8&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=106",
      ],
    },
    {
      name: "조세호",
      image: "/stickers/joseho.png",
      appearances: 2,
      youtubeLinks: [
        "https://www.youtube.com/watch?v=xQjkPhVgvRo&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=110",
        "https://www.youtube.com/watch?v=W7h5exjKWZ8&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=106"
      ],
    },
    {
      name: "남창희",
      image: "/stickers/namchanghee.png",
      appearances: 2,
      youtubeLinks: [
        "https://www.youtube.com/watch?v=xQjkPhVgvRo&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=110",
        "https://www.youtube.com/watch?v=W7h5exjKWZ8&list=PLE7NSUpyv6SWUghI2uuPHc_lrE4mvPK5y&index=106"
      ],
    },
  ];
  