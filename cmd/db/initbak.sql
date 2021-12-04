create table if not exists "Member"
(
    member_no              varchar     not null
        constraint member_pk
            primary key,
    member_id              varchar(20) not null,
    member_password        varchar     not null,
    member_phone           varchar,
    member_email           varchar,
    member_nickname        varchar,
    member_status          integer,
    member_last_login_date date,
    member_group_no        varchar
);

comment on table "Member" is '회원';

alter table "Member"
    owner to table_admin;

create unique index if not exists member_member_id_uindex
    on "Member" (member_id);

create unique index if not exists member_member_num_uindex
    on "Member" (member_no);

create table if not exists "Follow"
(
    member_no        varchar
        constraint member_no
            references "Member"
            on update cascade on delete cascade,
    follow_member_no varchar
        constraint follow_member_no
            references "Member"
            on update cascade on delete cascade
);

alter table "Follow"
    owner to table_admin;

create table if not exists "Post"
(
    post_no           varchar not null
        constraint post_pk
            primary key,
    post_content      varchar not null,
    post_view         integer,
    post_written_date date,
    member_no         varchar
        constraint member_no
            references "Member"
            on update cascade on delete cascade
);

alter table "Post"
    owner to table_admin;

create unique index if not exists post_post_no_uindex
    on "Post" (post_no);

create table if not exists "Comment"
(
    comment_no           varchar not null
        constraint comment_pk
            primary key,
    comment_written_date date    not null,
    comment_content      varchar not null,
    member_no            varchar
        constraint member_no
            references "Member"
            on update cascade on delete cascade,
    post_no              varchar
        constraint post_no
            references "Post"
            on update cascade on delete cascade
);

comment on table "Comment" is '댓글';

alter table "Comment"
    owner to table_admin;

create unique index if not exists comment_comment_no_uindex
    on "Comment" (comment_no);

create table if not exists "Express"
(
    member_no varchar
);

alter table "Express"
    owner to table_admin;

