-- schema.sql
CREATE DATABASE IF NOT EXISTS test_schedule;
USE test_schedule;
CREATE TABLE IF NOT EXISTS address
(
    id             int auto_increment
        primary key,
    address_line   varchar(255) null,
    address_number varchar(10)  null,
    neighborhood   varchar(200) null,
    city           varchar(100) not null,
    state          varchar(50)  null,
    code           varchar(10)  null
);
CREATE TABLE IF NOT EXISTS fones
(
    id          int auto_increment
        primary key,
    number      varchar(50) not null,
    schedule_id int         not null
);
CREATE TABLE IF NOT EXISTS schedule
(
    id         int auto_increment
        primary key,
    name       varchar(150) not null,
    email      varchar(100) null,
    address_id int          null,
    active     int(1)       not null
);
COMMIT;
