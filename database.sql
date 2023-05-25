-- DROP TABLE IF EXISTS `Название таблицы`;
-- 1) Типы работников
create TABLE IF NOT EXISTS positions(
    id SERIAL PRIMARY KEY,
    position_name VARCHAR(255) UNIQUE NOT NULL,
    salary INTEGER
);

-- CREATE EXTENSION pgcrypto;
-- Добавление расширения для реализации шифрования пароля
-- 2) Пользователи
create TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_surname VARCHAR(50),
    password VARCHAR (255) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- 3) Работники в кофейне
create TABLE IF NOT EXISTS workers(
    user_id INT NOT NULL,
    position_id INT NOT NULL,
    grant_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, position_id),
    FOREIGN KEY (position_id) REFERENCES positions (id),
    FOREIGN KEY (user_id) REFERENCES accounts (id)
);

-- НАПИТКИ
-- 9) Список сортов кофе в зернах
create TABLE IF NOT EXISTS coffee_beans(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    coffee_description TEXT,
    coffee_processing VARCHAR(255),
    coffee_roasting VARCHAR(255),
    coffee_descriptors TEXT,
    price INTEGER,
    volume INTEGER,
    format VARCHAR(255),
    -- Дрип-пакеты / Зерна 
    expiration_date TIMESTAMP WITHOUT TIME ZONE,
);

-- gen_random_uuid ()
-- 4) Категории напитков
create TABLE IF NOT EXISTS drink_categories(
    id uuid PRIMARY KEY,
    title VARCHAR(100),
    drink_ctgr_description TEXT,
    min_price INT,
    max_price INT
);

-- CREATE TABLE IF NOT EXISTS "drink_categories" (
--     "id" UUID,
--     "title" VARCHAR(100) NOT NULL UNIQUE,
--     "drink_ctgr_description" TEXT,
--     "min_price" INTEGER,
--     "max_price" INTEGER,
--     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
--     "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
--     PRIMARY KEY ("id")
-- );

-- 5) Список кофе
create TABLE IF NOT EXISTS coffee_drinks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    milk VARCHAR(255),
    volume INTEGER,
    price INTEGER,
    FOREIGN KEY (beans) REFERENCES coffee_beans (id),
    FOREIGN KEY (drink_category) REFERENCES drink_categories (id)
);

-- 6) Список чаев
create TABLE IF NOT EXISTS tea_drinks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    tea_type VARCHAR(255),
    volume INTEGER,
    price INTEGER,
    FOREIGN KEY (drink_category) REFERENCES drink_categories (id)
);

-- 7) Список холодных напитков
create TABLE IF NOT EXISTS fresh_drinks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    fresh_description TEXT,
    volume INTEGER,
    price INTEGER,
    FOREIGN KEY (drink_category) REFERENCES drink_categories (id)
);

-- ВЫПЕЧКА
-- 8) Список выпечки
create TABLE IF NOT EXISTS bakery(
    id SERIAL PRIMARY,
    title VARCHAR(255),
    price INTEGER,
    bakery_description TEXT,
);

-- КОРЗИНА И ИЗБРАННОЕ
-- 11) Корзина 
create TABLE IF NOT EXISTS cart(user_id REFERENCES accounts (id),);

-- 12) Избранное
-- 13) Список заказов