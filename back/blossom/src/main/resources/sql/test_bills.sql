SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Records of bills (Test Data)
-- ----------------------------
INSERT INTO `bills` VALUES (1, 20, 'income', 6000.00, '2025-03-01', '月薪入账', '工资');
INSERT INTO `bills` VALUES (2, 21, 'pay', 45.00, '2025-03-01', '午餐', '餐饮');
INSERT INTO `bills` VALUES (3, 22, 'pay', 35.00, '2025-03-01', '地铁', '交通');
INSERT INTO `bills` VALUES (4, 14, 'pay', 299.00, '2025-03-02', '新衣服', '购物');
INSERT INTO `bills` VALUES (5, 20, 'income', 1000.00, '2025-03-02', '项目奖金', '奖金');
INSERT INTO `bills` VALUES (6, 21, 'pay', 128.00, '2025-03-02', '电影票', '娱乐');
INSERT INTO `bills` VALUES (7, 22, 'pay', 200.00, '2025-03-03', '水电费', '居家');
INSERT INTO `bills` VALUES (8, 14, 'pay', 150.00, '2025-03-03', '看病买药', '医疗');
INSERT INTO `bills` VALUES (9, 20, 'income', 2000.00, '2025-03-03', '股票收益', '投资');
INSERT INTO `bills` VALUES (10, 21, 'pay', 300.00, '2025-03-04', '补习班', '教育');
INSERT INTO `bills` VALUES (11, 22, 'pay', 50.00, '2025-03-04', '公交月卡', '交通');
INSERT INTO `bills` VALUES (12, 14, 'income', 800.00, '2025-03-04', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (13, 20, 'pay', 65.00, '2025-03-05', '晚餐', '餐饮');
INSERT INTO `bills` VALUES (14, 21, 'income', 500.00, '2025-03-05', '生日礼金', '礼金');
INSERT INTO `bills` VALUES (15, 22, 'pay', 399.00, '2025-03-05', '耳机', '购物');
INSERT INTO `bills` VALUES (16, 14, 'income', 300.00, '2025-03-06', '中奖', '其他');
INSERT INTO `bills` VALUES (17, 20, 'pay', 150.00, '2025-03-06', '网吧', '娱乐');
INSERT INTO `bills` VALUES (18, 21, 'pay', 80.00, '2025-03-06', '宠物用品', '其他');
INSERT INTO `bills` VALUES (19, 22, 'income', 5500.00, '2025-03-07', '工资', '工资');
INSERT INTO `bills` VALUES (20, 14, 'pay', 250.00, '2025-03-07', '房屋维修', '居家');
INSERT INTO `bills` VALUES (21, 20, 'pay', 120.00, '2025-03-08', '体检', '医疗');
INSERT INTO `bills` VALUES (22, 21, 'income', 1500.00, '2025-03-08', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (23, 22, 'pay', 200.00, '2025-03-08', '买书', '教育');
INSERT INTO `bills` VALUES (24, 14, 'pay', 40.00, '2025-03-09', '早餐', '餐饮');
INSERT INTO `bills` VALUES (25, 20, 'income', 2000.00, '2025-03-09', '季度奖金', '奖金');
INSERT INTO `bills` VALUES (26, 21, 'pay', 60.00, '2025-03-09', '打车', '交通');
INSERT INTO `bills` VALUES (27, 22, 'pay', 599.00, '2025-03-10', '运动鞋', '购物');
INSERT INTO `bills` VALUES (28, 14, 'income', 1000.00, '2025-03-10', '基金收益', '投资');
INSERT INTO `bills` VALUES (29, 20, 'pay', 180.00, '2025-03-10', 'KTV', '娱乐');
INSERT INTO `bills` VALUES (30, 21, 'pay', 300.00, '2025-03-11', '家具', '居家');
INSERT INTO `bills` VALUES (31, 22, 'income', 6000.00, '2025-03-11', '工资', '工资');
INSERT INTO `bills` VALUES (32, 14, 'pay', 500.00, '2025-03-11', '牙科治疗', '医疗');
INSERT INTO `bills` VALUES (33, 20, 'pay', 1000.00, '2025-03-12', '培训课程', '教育');
INSERT INTO `bills` VALUES (34, 21, 'income', 800.00, '2025-03-12', '红包', '礼金');
INSERT INTO `bills` VALUES (35, 22, 'pay', 55.00, '2025-03-12', '午餐', '餐饮');
INSERT INTO `bills` VALUES (36, 14, 'pay', 30.00, '2025-03-13', '地铁', '交通');
INSERT INTO `bills` VALUES (37, 20, 'income', 1200.00, '2025-03-13', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (38, 21, 'pay', 450.00, '2025-03-13', '衣服', '购物');
INSERT INTO `bills` VALUES (39, 22, 'income', 3000.00, '2025-03-14', '投资收益', '投资');
INSERT INTO `bills` VALUES (40, 14, 'pay', 150.00, '2025-03-14', '游戏充值', '娱乐');
INSERT INTO `bills` VALUES (41, 20, 'pay', 400.00, '2025-03-14', '家电维修', '居家');
INSERT INTO `bills` VALUES (42, 21, 'income', 1000.00, '2025-03-15', '奖金', '奖金');
INSERT INTO `bills` VALUES (43, 22, 'pay', 200.00, '2025-03-15', '感冒药', '医疗');
INSERT INTO `bills` VALUES (44, 14, 'pay', 600.00, '2025-03-15', '补课', '教育');
INSERT INTO `bills` VALUES (45, 20, 'income', 500.00, '2025-03-16', '礼金', '礼金');
INSERT INTO `bills` VALUES (46, 21, 'pay', 100.00, '2025-03-16', '宠物医疗', '其他');
INSERT INTO `bills` VALUES (47, 22, 'income', 5000.00, '2025-03-16', '工资', '工资');
INSERT INTO `bills` VALUES (48, 14, 'pay', 75.00, '2025-03-16', '晚餐', '餐饮');
INSERT INTO `bills` VALUES (49, 20, 'income', 2500.00, '2025-03-17', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (50, 21, 'pay', 45.00, '2025-03-17', '公交', '交通');
INSERT INTO `bills` VALUES (51, 13, 'pay', 88.00, '2025-03-18', '午餐', '餐饮');
INSERT INTO `bills` VALUES (52, 13, 'income', 6000.00, '2025-03-18', '月薪入账', '工资');
INSERT INTO `bills` VALUES (53, 13, 'pay', 299.00, '2025-03-18', '新鞋子', '购物');
INSERT INTO `bills` VALUES (54, 13, 'pay', 40.00, '2025-03-19', '地铁', '交通');
INSERT INTO `bills` VALUES (55, 13, 'income', 1500.00, '2025-03-19', '项目奖金', '奖金');
INSERT INTO `bills` VALUES (56, 13, 'pay', 150.00, '2025-03-19', '电影院', '娱乐');
INSERT INTO `bills` VALUES (57, 13, 'pay', 250.00, '2025-03-20', '水费', '居家');
INSERT INTO `bills` VALUES (58, 13, 'pay', 200.00, '2025-03-20', '感冒药', '医疗');
INSERT INTO `bills` VALUES (59, 13, 'income', 2000.00, '2025-03-20', '股票收益', '投资');
INSERT INTO `bills` VALUES (60, 13, 'pay', 500.00, '2025-03-21', '补习班', '教育');
INSERT INTO `bills` VALUES (61, 13, 'pay', 60.00, '2025-03-21', '打车', '交通');
INSERT INTO `bills` VALUES (62, 13, 'income', 800.00, '2025-03-21', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (63, 13, 'pay', 75.00, '2025-03-22', '晚餐', '餐饮');
INSERT INTO `bills` VALUES (64, 13, 'income', 500.00, '2025-03-22', '生日礼金', '礼金');
INSERT INTO `bills` VALUES (65, 13, 'pay', 399.00, '2025-03-22', '衣服', '购物');
INSERT INTO `bills` VALUES (66, 13, 'income', 300.00, '2025-03-23', '中奖', '其他');
INSERT INTO `bills` VALUES (67, 13, 'pay', 200.00, '2025-03-23', '游戏充值', '娱乐');
INSERT INTO `bills` VALUES (68, 13, 'pay', 120.00, '2025-03-23', '宠物用品', '其他');
INSERT INTO `bills` VALUES (69, 13, 'income', 5500.00, '2025-03-24', '工资', '工资');
INSERT INTO `bills` VALUES (70, 13, 'pay', 300.00, '2025-03-24', '家具维修', '居家');
INSERT INTO `bills` VALUES (71, 13, 'pay', 150.00, '2025-03-24', '体检', '医疗');
INSERT INTO `bills` VALUES (72, 13, 'income', 1200.00, '2025-03-25', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (73, 13, 'pay', 400.00, '2025-03-25', '培训课程', '教育');
INSERT INTO `bills` VALUES (74, 13, 'pay', 45.00, '2025-03-25', '早餐', '餐饮');
INSERT INTO `bills` VALUES (75, 13, 'income', 2000.00, '2025-03-26', '季度奖金', '奖金');
INSERT INTO `bills` VALUES (76, 13, 'pay', 35.00, '2025-03-26', '公交', '交通');
INSERT INTO `bills` VALUES (77, 13, 'pay', 599.00, '2025-03-26', '电子产品', '购物');
INSERT INTO `bills` VALUES (78, 13, 'income', 1000.00, '2025-03-27', '基金收益', '投资');
INSERT INTO `bills` VALUES (79, 13, 'pay', 180.00, '2025-03-27', 'KTV', '娱乐');
INSERT INTO `bills` VALUES (80, 13, 'pay', 350.00, '2025-03-27', '电费', '居家');
INSERT INTO `bills` VALUES (81, 13, 'income', 6000.00, '2025-03-28', '工资', '工资');
INSERT INTO `bills` VALUES (82, 13, 'pay', 300.00, '2025-03-28', '牙科治疗', '医疗');
INSERT INTO `bills` VALUES (83, 13, 'pay', 800.00, '2025-03-28', '考试报名', '教育');
INSERT INTO `bills` VALUES (84, 13, 'income', 800.00, '2025-03-29', '红包', '礼金');
INSERT INTO `bills` VALUES (85, 13, 'pay', 65.00, '2025-03-29', '午餐', '餐饮');
INSERT INTO `bills` VALUES (86, 13, 'pay', 30.00, '2025-03-29', '地铁', '交通');
INSERT INTO `bills` VALUES (87, 13, 'income', 1500.00, '2025-03-30', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (88, 13, 'pay', 450.00, '2025-03-30', '运动鞋', '购物');
INSERT INTO `bills` VALUES (89, 13, 'income', 3000.00, '2025-03-30', '投资收益', '投资');
INSERT INTO `bills` VALUES (90, 13, 'pay', 150.00, '2025-03-31', '游戏充值', '娱乐');
INSERT INTO `bills` VALUES (91, 13, 'pay', 400.00, '2025-03-31', '家电维修', '居家');
INSERT INTO `bills` VALUES (92, 13, 'income', 1000.00, '2025-03-31', '奖金', '奖金');
INSERT INTO `bills` VALUES (93, 13, 'pay', 200.00, '2025-04-01', '药品', '医疗');
INSERT INTO `bills` VALUES (94, 13, 'pay', 600.00, '2025-04-01', '补课', '教育');
INSERT INTO `bills` VALUES (95, 13, 'income', 500.00, '2025-04-01', '礼金', '礼金');
INSERT INTO `bills` VALUES (96, 13, 'pay', 100.00, '2025-04-01', '宠物医疗', '其他');
INSERT INTO `bills` VALUES (97, 13, 'income', 5000.00, '2025-04-02', '工资', '工资');
INSERT INTO `bills` VALUES (98, 13, 'pay', 75.00, '2025-04-02', '晚餐', '餐饮');
INSERT INTO `bills` VALUES (99, 13, 'income', 2500.00, '2025-04-02', '兼职收入', '兼职');
INSERT INTO `bills` VALUES (100, 13, 'pay', 45.00, '2025-04-02', '公交', '交通');

SET FOREIGN_KEY_CHECKS = 1;