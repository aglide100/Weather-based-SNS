create table if not exists "Mem"
(
    mem_no              varchar(20)     not null
        constraint mem_pk primary key,
    mem_id              varchar(20)     not null,
    mem_pw              varchar(45)     not null,
    mem_phone           varchar(13),
    mem_email           varchar(20),
    mem_name            varchar(20),
    mem_nickname        varchar(20),
    mem_active_yn       varchar(1),
    mem_last_login_date date,
    mem_group_no        varchar(45)
);
comment on table "Mem" is '회원';

create unique index if not exists mem_mem_id_uindex
    on "Mem" (mem_id);

create unique index if not exists mem_mem_num_uindex
    on "Mem" (mem_no);

create table if not exists "Follow"
(
    mem_no        varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    follower_no varchar(20)
        constraint follower_no
            references "Mem"
            on update cascade on delete cascade,
    primary key (mem_no, follower_no)
);

create table if not exists "Mem_Ticket"
(
    mem_ticket_no           integer       not null
        constraint mem_ticket_no primary key,
    mem_ticket_give_date    date,
    mem_no varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade
);

create table if not exists "Attend"
(
    attend_date date,
    mem_no      varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade
);



create table if not exists "Grade"
(
    grade_kind varchar(20) UNIQUE,
    grade_people integer,
    category_code varchar(20) UNIQUE,
    primary key(grade_kind, category_code)
);

create table if not exists "Mem_Grade"
(
    mem_no      varchar(20)
        constraint mem_no
            references "Mem"(mem_no)
            on update cascade on delete cascade,
    mem_grade_achieve_date date,
    grade_kind  varchar(20)
        constraint grade_kind
            references "Grade"(grade_kind)
            on update cascade on delete cascade,
    category_code varchar(20)
    	constraint category_code
    		references "Grade"(category_code)
    		on update cascade on delete cascade,
    primary key (mem_no, grade_kind, category_code)
);

create table if not exists "Promo"
(
    promo_no varchar(20)
        constraint promo_no primary key,
    promo_title varchar(100),
    promo_content varchar(1000),
    promo_start_date date,
    promo_end_date date,
    promo_total_ticket_count int,
    admin_no varchar(20)
        constraint admin_no
            references "Mem"(mem_no)
                on update cascade on delete no action
);

create table if not exists "Promo_Winner"
(
    mem_no      varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    promo_no    varchar(20)
        constraint promo_no
            references "Promo"
            on update cascade on delete cascade,
    promo_winner_select_yn      varchar(1),
    promo_winner_announ_date    date,
    promo_winner_giveticket_count integer,
    primary key (mem_no, promo_no)
);

create table if not exists "Post"
(
    post_no         varchar(20)   not null
        constraint post_pk primary key,
    post_content    varchar(100)  not null,
    post_view_count integer,
    post_kind       varchar(20),
    post_written_date date,
    mem_no         varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade
);

create unique index if not exists post_post_no_uindex
    on "Post" (post_no);

create table if not exists "Comment"
(
    comment_no           varchar(20) not null,
    comment_written_date date          not null,
    comment_content      varchar(100) not null,
    mem_no            varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    post_no              varchar(20)
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    primary key (post_no, comment_no)
);
comment on table "Comment" is '댓글';

create unique index if not exists comment_comment_no_uindex
    on "Comment" (comment_no);

create table if not exists "Express"
(
    mem_no         varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    post_no        varchar(20)
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    express_kind varchar(45),
    express_date date,
    primary key (mem_no, post_no)
);

create table if not exists "Basic_tag"
(
    basic_tag_no integer
        constraint basic_tag_no primary key,
    Basic_tag_name varchar(20)
);

create table if not exists "Post_Basic_tag"
(
    basic_tag_no    integer
        constraint basic_tag_no
            references "Basic_tag"
            on update cascade on delete cascade,
    post_no         varchar(20)
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    post_basic_tag_usecount integer,
    primary key (basic_tag_no, post_no)
);

create table if not exists "User_tag"
(
    user_tag integer
        constraint user_tag primary key,
    user_tag_name varchar(20),
    user_tag_upload_date date
);

create table if not exists "Post_User_tag"
(
    user_tag_no    integer
        constraint user_tag_no
            references "User_tag"
            on update cascade on delete cascade,
    post_no         varchar(20)
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    post_user_tag_usecount integer,
    primary key (user_tag_no, post_no)
);

create table if not exists "Goods"
(
    goods_no    varchar(20)
        constraint goods_no primary key,
    goods_name  varchar(100),
    goods_content   varchar(1000),
    goods_count     integer,
    goods_required_ticket_count integer,
    goods_end_date  date,
    goods_photo bytea
);

create table if not exists "Goods_Give_history"
(
    mem_no         varchar(20)
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    goods_no       varchar(20)
        constraint goods_no
            references "Goods"
            on update cascade on delete cascade,
    goods_give_name     varchar(20),
    goods_give_address  varchar(80),
    goods_give_email    varchar(45),
    goods_give_date     date,
    primary key (mem_no, goods_no)
);

create table if not exists "Com"
(
    com_no      varchar(20)
        constraint com_no primary key,
    com_name    varchar(50),
    com_phone   varchar(13),
    com_ceo     varchar(50),
    com_regis_no    varchar(12)
);

create table if not exists "Sponsor_history"
(
    goods_no    varchar(20)
        constraint goods_no
            references "Goods"
            on update cascade on delete cascade,
    com_no      varchar(20)
        constraint com_no
            references "Com"
            on update cascade on delete cascade,
    sponsor_start_date  date,
    sponsor_end_date    date,
    primary key(goods_no, com_no)
);

create table if not exists "Ad"
(
    ad_no       varchar(20)
        constraint  ad_no primary key,
    ad_location varchar(10),
    ad_content  varchar(1000),
    ad_start_date   date,
    ad_end_date     date,
    ad_max_temp     integer,
    ad_min_temp     integer,
    ad_max_humid    integer,
    ad_min_humid    integer,
    category_code   varchar(20)
);

create table if not exists "Ad_history"
(
    com_no  varchar(20)
        constraint com_no
            references "Com"
            on update cascade on delete no action,
    ad_no   varchar(20)
        constraint ad_no
            references "Ad"
            on update cascade on delete no action,
    ad_cost integer,
    ad_pay_method   varchar(20),
    ad_impre_count  integer,
    primary key (com_no, ad_no)
);