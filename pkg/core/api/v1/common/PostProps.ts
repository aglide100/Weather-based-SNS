export type PostProps = {
  post_no: number;
  post_content: string;
  post_view_count: number;
  post_kind: string;
  post_written_date: string;
  post_weather: string;
  post_title: string;
  //   like 테이블에서 join할것
  post_like_count?: number;
  post_useful_count?: number;
  mem_no: number;
};
