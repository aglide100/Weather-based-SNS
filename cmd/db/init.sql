create table if not exists "Mem"
(
    mem_no              serial
        constraint mem_pk
            primary key,
    mem_id              varchar(20) not null,
    mem_pw              varchar(45) not null,
    mem_phone           varchar(13),
    mem_email           varchar(20),
    mem_name            varchar(20),
    mem_nickname        varchar(20),
    mem_active_yn       varchar(1),
    mem_last_login_date date,
    mem_group_no        varchar(45),
    mem_photo           pg_largeobject
);

comment on table "Mem" is '회원';

alter table "Mem"
    owner to table_admin;

create unique index if not exists mem_mem_id_uindex
    on "Mem" (mem_id);

create unique index if not exists mem_mem_num_uindex
    on "Mem" (mem_no);

create table if not exists "Mem_Ticket"
(
    mem_ticket_no        serial
        constraint mem_ticket_no
            primary key,
    mem_ticket_give_date date,
    mem_no               serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    mem_ticket_used_date date,
    mem_ticket_count     integer
);

alter table "Mem_Ticket"
    owner to table_admin;

create table if not exists "Attend"
(
    attend_date timestamp,
    mem_no      serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade
);

alter table "Attend"
    owner to table_admin;

create table if not exists "Grade"
(
    grade_no      serial
        constraint "Grade_pkey"
            primary key,
    grade_kind    varchar(20),
    grade_people  integer,
    category_code varchar(20)
);

alter table "Grade"
    owner to table_admin;

create table if not exists "Mem_Grade"
(
    mem_no                 serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    mem_grade_achieve_date timestamp,
    grade_no               serial
        constraint grade_no
            references "Grade"
            on update cascade on delete cascade,
    constraint "Mem_Grade_pkey"
        primary key (mem_no, grade_no)
);

alter table "Mem_Grade"
    owner to table_admin;

create table if not exists "Goods"
(
    goods_no                    serial
        constraint goods_no
            primary key,
    goods_name                  varchar(100),
    goods_content               varchar(1000),
    goods_count                 integer,
    goods_required_ticket_count integer,
    goods_end_date              date,
    goods_photo                 bytea,
    goods_start_date            date
);

alter table "Goods"
    owner to table_admin;

create table if not exists "Goods_Give_history"
(
    mem_no             serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    goods_no           serial
        constraint goods_no
            references "Goods"
            on update cascade on delete cascade,
    goods_give_name    varchar(20),
    goods_give_address varchar(80),
    goods_give_email   varchar(45),
    goods_give_date    date,
    goods_start_date   date,
    constraint "Goods_Give_history_pkey"
        primary key (mem_no, goods_no)
);

alter table "Goods_Give_history"
    owner to table_admin;

create table if not exists "Com"
(
    com_no       serial
        constraint com_no
            primary key,
    com_name     varchar(50),
    com_phone    varchar(13),
    com_ceo      varchar(50),
    com_regis_no varchar(12)
);

alter table "Com"
    owner to table_admin;

create table if not exists "Ad"
(
    ad_no         integer default nextval('"Ad_ad_no_seq1"'::regclass) not null
        constraint ad_no
            primary key,
    ad_location   varchar(10),
    ad_content    varchar(1000),
    ad_start_date date,
    ad_end_date   date,
    ad_max_temp   integer,
    ad_min_temp   integer,
    ad_max_humid  integer,
    ad_min_humid  integer,
    category_code varchar(20)
);

alter table "Ad"
    owner to table_admin;

create table if not exists "Ad_history"
(
    com_no         serial
        constraint com_no
            references "Com"
            on update cascade,
    ad_no          serial
        constraint ad_no
            references "Ad"
            on update cascade,
    ad_cost        integer,
    ad_pay_method  varchar(20),
    ad_impre_count integer,
    constraint "Ad_history_pkey"
        primary key (com_no, ad_no)
);

alter table "Ad_history"
    owner to table_admin;

create table if not exists "Follow"
(
    mem_no      serial
        constraint "Follow_pkey"
            primary key
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    follower_no serial
        constraint follower_no
            references "Mem"
            on update cascade on delete cascade
);

alter table "Follow"
    owner to table_admin;

create table if not exists "Promo"
(
    promo_no                 serial
        constraint promo_no
            primary key,
    promo_title              varchar(100),
    promo_content            varchar(1000),
    promo_start_date         date,
    promo_end_date           date,
    promo_total_ticket_count integer,
    admin_no                 serial
        constraint admin_no
            references "Mem"
            on update cascade,
    promo_photo              pg_largeobject
);

alter table "Promo"
    owner to table_admin;

create table if not exists "Promo_Winner"
(
    mem_no                        serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    promo_no                      serial
        constraint promo_no
            references "Promo"
            on update cascade on delete cascade,
    promo_winner_select_yn        varchar(1),
    promo_winner_announ_date      date,
    promo_winner_giveticket_count integer,
    constraint "Promo_Winner_pkey"
        primary key (mem_no, promo_no)
);

alter table "Promo_Winner"
    owner to table_admin;

create table if not exists "Post"
(
    post_no           serial
        constraint post_pk
            primary key,
    post_content      varchar(100) not null,
    post_view_count   integer,
    post_kind         varchar(20),
    post_written_date date,
    mem_no            serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    post_title        varchar,
    post_photo        pg_largeobject,
    post_weather      varchar
);

alter table "Post"
    owner to table_admin;

create unique index if not exists post_post_no_uindex
    on "Post" (post_no);

create table if not exists "Comment"
(
    comment_no           serial,
    comment_written_date date         not null,
    comment_content      varchar(100) not null,
    mem_no               serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    post_no              serial
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    constraint "Comment_pkey"
        primary key (post_no, comment_no)
);

comment on table "Comment" is '댓글';

alter table "Comment"
    owner to table_admin;

create unique index if not exists comment_comment_no_uindex
    on "Comment" (comment_no);

create table if not exists "Express"
(
    mem_no       serial
        constraint mem_no
            references "Mem"
            on update cascade on delete cascade,
    post_no      serial
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    express_kind varchar(45),
    express_date timestamp,
    constraint "Express_pkey"
        primary key (mem_no, post_no)
);

alter table "Express"
    owner to table_admin;

create table if not exists "User_tag"
(
    user_tag             serial
        constraint user_tag
            primary key,
    user_tag_name        varchar(20),
    user_tag_upload_date timestamp,
    category_code        varchar(20)
);

alter table "User_tag"
    owner to table_admin;

create table if not exists "Post_User_tag"
(
    user_tag_no            serial
        constraint user_tag_no
            references "User_tag"
            on update cascade on delete cascade,
    post_no                serial
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    post_user_tag_usecount serial,
    constraint "Post_User_tag_pkey"
        primary key (user_tag_no, post_no)
);

alter table "Post_User_tag"
    owner to table_admin;

create table if not exists "Sponsor_history"
(
    goods_no           serial
        constraint goods_no
            references "Goods"
            on update cascade on delete cascade,
    com_no             serial
        constraint com_no
            references "Com"
            on update cascade on delete cascade,
    sponsor_start_date date,
    sponsor_end_date   date,
    constraint "Sponsor_history_pkey"
        primary key (goods_no, com_no)
);

alter table "Sponsor_history"
    owner to table_admin;

create table if not exists "Basic_tag"
(
    basic_tag_no   serial
        constraint basic_tag_no
            primary key,
    basic_tag_name varchar(20),
    category_code  varchar(20)
);

alter table "Basic_tag"
    owner to table_admin;

create table if not exists "Post_Basic_tag"
(
    basic_tag_no            serial
        constraint basic_tag_no
            references "Basic_tag"
            on update cascade on delete cascade,
    post_no                 serial
        constraint post_no
            references "Post"
            on update cascade on delete cascade,
    post_basic_tag_usecount serial,
    constraint "Post_Basic_tag_pkey"
        primary key (basic_tag_no, post_no)
);

alter table "Post_Basic_tag"
    owner to table_admin;