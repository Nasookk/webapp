-- Эзэн хэрэглэгч үүсгэх
INSERT OR IGNORE INTO users (id, email, password, role) 
VALUES (1, 'admin@foodapp.mn', '123456', 'owner');

-- Ресторануудыг оруулах
INSERT OR IGNORE INTO restaurants (id, name, location, rating, menu, traf, img, owner_id) VALUES 
(1, 'Этүгэн', 'MUIS III', '5/5', 'Цуйван,Хуушуур', '80%', './img/img_restaurants/etugen.png', 1),
(2, 'Мандах зоог', 'MUIS II', '4/5', NULL, NULL, './img/img_restaurants/mandah.png', 1),
(3, 'Friends зоог', 'MUIS II', '4/5', NULL, NULL, './img/img_restaurants/friends.png', 1),
(4, 'Дэлгэрэх зоог', 'MUIS I', '4.5/5', NULL, NULL, 'https://images.unsplash.com/photo-1544025162-d76694265947', 1),
(5, 'Зөгий үүр зоогийн газар', 'MUIS I', '4.5/5', NULL, NULL, 'https://images.unsplash.com/photo-1544025162-d76694265947', 1),
(6, 'Сайн зоог', 'MUIS I', '4.5/5', NULL, NULL, 'https://images.unsplash.com/photo-1544025162-d76694265947', 1),
(7, 'Малатан', 'MUIS I', '4.5/5', NULL, NULL, 'https://images.unsplash.com/photo-1544025162-d76694265947', 1);

-- Хоолнуудыг оруулах (Этүгэн ресторан руу холбов)
INSERT OR IGNORE INTO foods (name, price, rating, ingredients, calories, img, restaurant_id) VALUES 
('Пирошки', '2,000₮', '5/5', 'Гурил, мах, сонгино', '~320 ккал', './img/img_foods/piroshki.png', 1),
('Гурилтай шөл', '13,000₮', '4/5', 'Гурил, мах, ногоо', '~280 ккал', './img/img_foods/shul.png', 1),
('Цуйван', '12,000₮', '4.5/5', 'Гахайн мах, гоймон, ногоо', '~520 ккал', './img/img_foods/tsuivan.png', 1),
('Төмсний хучмал', '12,000₮', '4.5/5', 'Төмс, татсан мах, ногоо', '~520 ккал', './img/img_foods/huchmal.png', 1),
('Өндөгтэй хуурга', '12,000₮', '4.5/5', 'Өндөг, мах, ногоо', '~520 ккал', './img/img_foods/uhuurga.png', 1),
('Тактуритан', '12,000₮', '4.5/5', 'Тахианы мах, төмс, лууван', '~520 ккал', './img/img_foods/takturitan.png', 1),
('Банштай цай', '12,000₮', '4.5/5', 'Банш, сүүтэй цай', '~520 ккал', './img/img_foods/tsai.png', 1),
('Хуушуур', '12,000₮', '4.5/5', 'Мах, гурил', '~520 ккал', './img/img_foods/huushuur.png', 1);