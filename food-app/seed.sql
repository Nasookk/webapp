DELETE FROM foods;
DELETE FROM restaurants;

INSERT OR IGNORE INTO users (id, username, email, password, role) 
VALUES 
(1, 'Admin', 'admin@foodapp.mn', '123456', 'owner'),
(2, 'Amaraa', 'amaraa@gmail.com', '123456', 'user'), 
(3, 'Naso', 'naso@gmail.com', '123456', 'user');

INSERT OR IGNORE INTO restaurants (id, name, location, rating, menu, img, owner_id) VALUES 
(1, 'Этүгэн', 'MUIS III', '5/5', 'Цуйван,Хуушуур', './img/img_restaurants/etugen.webp', 5),
(2, 'Мандах зоог', 'MUIS II', '4/5', NULL, './img/img_restaurants/mandah.webp', 4),
(3, 'Friends зоог', 'MUIS II', '4/5', NULL, './img/img_restaurants/friends.webp', 1),
(4, 'Дэлгэрэх зоог', 'MUIS I', '4.5/5', NULL, './img/img_restaurants/etugen.webp', 1),
(5, 'Зөгий үүр зоог', 'MUIS I', '4.5/5', NULL, './img/img_restaurants/friends.webp', 1),
(6, 'Сайн зоог', 'MUIS I', '4.5/5', NULL, './img/img_restaurants/mandah.webp', 1),
(7, 'Малатан', 'MUIS I', '4.5/5', NULL, './img/img_restaurants/mandah.webp', 1); 

INSERT OR IGNORE INTO foods (name, price, rating, ingredients, calories, img, restaurant_id) VALUES 
('Пирошки', '2,000₮', '5/5', 'Гурил, мах, сонгино', '~320 ккал', './img/img_foods/piroshki.webp', 1),
('Гурилтай шөл', '13,000₮', '4/5', 'Гурил, мах, ногоо', '~280 ккал', './img/img_foods/shul.webp', 2),
('Цуйван', '12,000₮', '4.5/5', 'Гахайн мах, гоймон, ногоо', '~520 ккал', './img/img_foods/tsuivan.webp', 1),
('Төмсний хучмал', '12,000₮', '4.5/5', 'Төмс, татсан мах, ногоо', '~520 ккал', './img/img_foods/huchmal.webp', 4),
('Өндөгтэй хуурга', '12,000₮', '4.5/5', 'Өндөг, мах, ногоо', '~520 ккал', './img/img_foods/uhuurga.webp', 1),
('Тактуритан', '12,000₮', '4.5/5', 'Тахианы мах, төмс, лууван', '~520 ккал', './img/img_foods/takturitan.webp', 3),
('Банштай цай', '12,000₮', '4.5/5', 'Банш, сүүтэй цай', '~520 ккал', './img/img_foods/tsai.webp', 1),
('Хуушуур', '12,000₮', '4.5/5', 'Мах, гурил', '~520 ккал', './img/img_foods/huushuur.webp', 1);