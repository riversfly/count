SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bills
-- ----------------------------
DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'pay/income',
  `money` decimal(10, 2) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注/用途说明',
  `use_for` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_date`(`user_id` ASC, `date` ASC) USING BTREE,
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 202 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bills
-- ----------------------------
INSERT INTO `bills` VALUES (95, 13, 'pay', -15.50, '2023-01-01', NULL, '早餐');
INSERT INTO `bills` VALUES (96, 14, 'pay', -28.00, '2023-01-01', NULL, '午餐');
INSERT INTO `bills` VALUES (97, 15, 'pay', -45.00, '2023-01-01', NULL, '晚餐');
INSERT INTO `bills` VALUES (98, 16, 'income', 3000.00, '2023-01-01', NULL, '工资');
INSERT INTO `bills` VALUES (99, 17, 'pay', -8.50, '2023-01-02', NULL, '咖啡');
INSERT INTO `bills` VALUES (100, 18, 'pay', -120.00, '2023-01-02', NULL, '超市购物');
INSERT INTO `bills` VALUES (101, 19, 'pay', -35.00, '2023-01-02', NULL, '电影票');
INSERT INTO `bills` VALUES (102, 13, 'pay', -60.00, '2023-01-03', NULL, '交通卡充值');
INSERT INTO `bills` VALUES (103, 14, 'income', 500.00, '2023-01-03', NULL, '兼职收入');
INSERT INTO `bills` VALUES (104, 15, 'pay', -25.00, '2023-01-03', NULL, '外卖');
INSERT INTO `bills` VALUES (105, 16, 'pay', -18.00, '2023-01-04', NULL, '早餐');
INSERT INTO `bills` VALUES (106, 17, 'pay', -22.00, '2023-01-04', NULL, '午餐');
INSERT INTO `bills` VALUES (107, 18, 'pay', -150.00, '2023-01-04', NULL, '衣服');
INSERT INTO `bills` VALUES (108, 19, 'pay', -30.00, '2023-01-05', NULL, '零食');
INSERT INTO `bills` VALUES (109, 13, 'pay', -75.00, '2023-01-05', NULL, '电子产品');
INSERT INTO `bills` VALUES (110, 14, 'income', 800.00, '2023-01-05', NULL, '奖金');
INSERT INTO `bills` VALUES (111, 15, 'pay', -12.00, '2023-01-06', NULL, '早餐');
INSERT INTO `bills` VALUES (112, 16, 'pay', -28.50, '2023-01-06', NULL, '午餐');
INSERT INTO `bills` VALUES (113, 17, 'pay', -40.00, '2023-01-06', NULL, '晚餐');
INSERT INTO `bills` VALUES (114, 18, 'pay', -90.00, '2023-01-07', NULL, '周末购物');
INSERT INTO `bills` VALUES (115, 19, 'pay', -15.00, '2023-01-07', NULL, '饮料');
INSERT INTO `bills` VALUES (116, 13, 'pay', -55.00, '2023-01-07', NULL, '餐厅');
INSERT INTO `bills` VALUES (117, 14, 'income', 200.00, '2023-01-08', NULL, '退款');
INSERT INTO `bills` VALUES (118, 15, 'pay', -32.00, '2023-01-08', NULL, '下午茶');
INSERT INTO `bills` VALUES (119, 16, 'pay', -18.50, '2023-01-08', NULL, '宵夜');
INSERT INTO `bills` VALUES (120, 17, 'pay', -25.00, '2023-01-09', NULL, '早餐');
INSERT INTO `bills` VALUES (121, 18, 'pay', -22.00, '2023-01-09', NULL, '午餐');
INSERT INTO `bills` VALUES (122, 19, 'pay', -38.00, '2023-01-09', NULL, '晚餐');
INSERT INTO `bills` VALUES (123, 13, 'pay', -65.00, '2023-01-10', NULL, '交通');
INSERT INTO `bills` VALUES (124, 14, 'income', 1500.00, '2023-01-10', NULL, '项目收入');
INSERT INTO `bills` VALUES (125, 15, 'pay', -28.00, '2023-01-10', NULL, '电影');
INSERT INTO `bills` VALUES (126, 16, 'pay', -12.50, '2023-01-11', NULL, '早餐');
INSERT INTO `bills` VALUES (127, 17, 'pay', -24.00, '2023-01-11', NULL, '午餐');
INSERT INTO `bills` VALUES (128, 18, 'pay', -42.00, '2023-01-11', NULL, '晚餐');
INSERT INTO `bills` VALUES (129, 19, 'pay', -110.00, '2023-01-12', NULL, '购物');
INSERT INTO `bills` VALUES (130, 13, 'pay', -16.00, '2023-01-12', NULL, '咖啡');
INSERT INTO `bills` VALUES (131, 14, 'pay', -30.00, '2023-01-12', NULL, '外卖');
INSERT INTO `bills` VALUES (132, 15, 'income', 3500.00, '2023-01-13', NULL, '工资');
INSERT INTO `bills` VALUES (133, 16, 'pay', -20.00, '2023-01-13', NULL, '午餐');
INSERT INTO `bills` VALUES (134, 17, 'pay', -50.00, '2023-01-13', NULL, '晚餐');
INSERT INTO `bills` VALUES (135, 18, 'pay', -18.00, '2023-01-14', NULL, '早餐');
INSERT INTO `bills` VALUES (136, 19, 'pay', -26.00, '2023-01-14', NULL, '午餐');
INSERT INTO `bills` VALUES (137, 13, 'pay', -45.00, '2023-01-14', NULL, '晚餐');
INSERT INTO `bills` VALUES (138, 14, 'pay', -85.00, '2023-01-15', NULL, '周末活动');
INSERT INTO `bills` VALUES (139, 15, 'pay', -14.00, '2023-01-15', NULL, '饮料');
INSERT INTO `bills` VALUES (140, 16, 'pay', -32.00, '2023-01-15', NULL, '小吃');
INSERT INTO `bills` VALUES (141, 17, 'pay', -22.50, '2023-01-16', NULL, '早餐');
INSERT INTO `bills` VALUES (142, 18, 'pay', -28.00, '2023-01-16', NULL, '午餐');
INSERT INTO `bills` VALUES (143, 19, 'pay', -40.00, '2023-01-16', NULL, '晚餐');
INSERT INTO `bills` VALUES (144, 13, 'pay', -70.00, '2023-01-17', NULL, '交通');
INSERT INTO `bills` VALUES (145, 14, 'income', 600.00, '2023-01-17', NULL, '兼职');
INSERT INTO `bills` VALUES (146, 15, 'pay', -25.00, '2023-01-17', NULL, '电影票');
INSERT INTO `bills` VALUES (147, 16, 'pay', -15.00, '2023-01-18', NULL, '早餐');
INSERT INTO `bills` VALUES (148, 17, 'pay', -24.50, '2023-01-18', NULL, '午餐');
INSERT INTO `bills` VALUES (149, 18, 'pay', -36.00, '2023-01-18', NULL, '晚餐');
INSERT INTO `bills` VALUES (150, 19, 'pay', -95.00, '2023-01-19', NULL, '购物');
INSERT INTO `bills` VALUES (151, 13, 'pay', -17.00, '2023-01-19', NULL, '咖啡');
INSERT INTO `bills` VALUES (152, 14, 'pay', -29.00, '2023-01-19', NULL, '外卖');
INSERT INTO `bills` VALUES (153, 15, 'income', 2800.00, '2023-01-20', NULL, '工资');
INSERT INTO `bills` VALUES (154, 16, 'pay', -21.00, '2023-01-20', NULL, '午餐');
INSERT INTO `bills` VALUES (155, 17, 'pay', -48.00, '2023-01-20', NULL, '晚餐');
INSERT INTO `bills` VALUES (156, 18, 'pay', -19.50, '2023-01-21', NULL, '早餐');
INSERT INTO `bills` VALUES (157, 19, 'pay', -27.00, '2023-01-21', NULL, '午餐');
INSERT INTO `bills` VALUES (158, 13, 'pay', -44.00, '2023-01-21', NULL, '晚餐');
INSERT INTO `bills` VALUES (159, 14, 'pay', -80.00, '2023-01-22', NULL, '周末购物');
INSERT INTO `bills` VALUES (160, 15, 'pay', -13.00, '2023-01-22', NULL, '饮料');
INSERT INTO `bills` VALUES (161, 16, 'pay', -31.00, '2023-01-22', NULL, '小吃');
INSERT INTO `bills` VALUES (162, 17, 'pay', -23.00, '2023-01-23', NULL, '早餐');
INSERT INTO `bills` VALUES (163, 18, 'pay', -29.50, '2023-01-23', NULL, '午餐');
INSERT INTO `bills` VALUES (164, 19, 'pay', -41.00, '2023-01-23', NULL, '晚餐');
INSERT INTO `bills` VALUES (165, 13, 'pay', -75.00, '2023-01-24', NULL, '交通');
INSERT INTO `bills` VALUES (166, 14, 'income', 700.00, '2023-01-24', NULL, '项目收入');
INSERT INTO `bills` VALUES (167, 15, 'pay', -26.00, '2023-01-24', NULL, '电影');
INSERT INTO `bills` VALUES (168, 16, 'pay', -16.50, '2023-01-25', NULL, '早餐');
INSERT INTO `bills` VALUES (169, 17, 'pay', -25.00, '2023-01-25', NULL, '午餐');
INSERT INTO `bills` VALUES (170, 18, 'pay', -37.00, '2023-01-25', NULL, '晚餐');
INSERT INTO `bills` VALUES (171, 19, 'pay', -105.00, '2023-01-26', NULL, '购物');
INSERT INTO `bills` VALUES (172, 13, 'pay', -19.00, '2023-01-26', NULL, '咖啡');
INSERT INTO `bills` VALUES (173, 14, 'pay', -33.00, '2023-01-26', NULL, '外卖');
INSERT INTO `bills` VALUES (174, 15, 'income', 3200.00, '2023-01-27', NULL, '工资');
INSERT INTO `bills` VALUES (175, 16, 'pay', -20.50, '2023-01-27', NULL, '午餐');
INSERT INTO `bills` VALUES (176, 17, 'pay', -47.00, '2023-01-27', NULL, '晚餐');
INSERT INTO `bills` VALUES (177, 18, 'pay', -17.00, '2023-01-28', NULL, '早餐');
INSERT INTO `bills` VALUES (178, 19, 'pay', -26.50, '2023-01-28', NULL, '午餐');
INSERT INTO `bills` VALUES (179, 13, 'pay', -43.00, '2023-01-28', NULL, '晚餐');
INSERT INTO `bills` VALUES (180, 14, 'pay', -90.00, '2023-01-29', NULL, '周末活动');
INSERT INTO `bills` VALUES (181, 15, 'pay', -14.50, '2023-01-29', NULL, '饮料');
INSERT INTO `bills` VALUES (182, 16, 'pay', -30.00, '2023-01-29', NULL, '小吃');
INSERT INTO `bills` VALUES (183, 17, 'pay', -24.00, '2023-01-30', NULL, '早餐');
INSERT INTO `bills` VALUES (184, 18, 'pay', -28.50, '2023-01-30', NULL, '午餐');
INSERT INTO `bills` VALUES (185, 19, 'pay', -39.00, '2023-01-30', NULL, '晚餐');
INSERT INTO `bills` VALUES (186, 13, 'pay', -85.00, '2023-01-31', NULL, '交通');
INSERT INTO `bills` VALUES (187, 14, 'income', 400.00, '2023-01-31', NULL, '兼职');
INSERT INTO `bills` VALUES (188, 15, 'pay', -27.00, '2023-01-31', NULL, '电影票');
INSERT INTO `bills` VALUES (190, 13, 'pay', 90.00, '2023-01-01', '吃饭', '早餐');
INSERT INTO `bills` VALUES (193, 13, 'income', 123.00, '2025-04-06', '123', '工资');
INSERT INTO `bills` VALUES (194, 14, 'pay', 123.00, '2025-04-06', '吃饭烦烦烦烦烦放哪放哪发难放哪放哪发难', '其他');
INSERT INTO `bills` VALUES (195, 14, 'pay', 234.00, '2025-04-01', '234', '餐饮');
INSERT INTO `bills` VALUES (196, 14, 'income', 888.00, '2025-04-06', '666', '工资');
INSERT INTO `bills` VALUES (197, 14, 'pay', 0.01, '2025-04-03', '000', '餐饮');
INSERT INTO `bills` VALUES (198, 14, 'pay', 999.00, '2025-03-07', '0', '餐饮');
INSERT INTO `bills` VALUES (199, 14, 'income', 999.00, '2025-04-06', '', '工资');
INSERT INTO `bills` VALUES (200, 13, 'income', 999.00, '2025-04-07', '99', '奖金');
INSERT INTO `bills` VALUES (201, 20, 'income', 888.00, '2025-04-07', '888', '工资');

SET FOREIGN_KEY_CHECKS = 1;
