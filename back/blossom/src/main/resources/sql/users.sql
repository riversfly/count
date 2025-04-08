SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (13, '123', '123123');
INSERT INTO `users` VALUES (14, '123123', '123123');
INSERT INTO `users` VALUES (15, '123123123', '123123');
INSERT INTO `users` VALUES (16, '111111', '111111');
INSERT INTO `users` VALUES (17, '1111111', '1111111');
INSERT INTO `users` VALUES (18, 'huangwenqin', '123456');
INSERT INTO `users` VALUES (19, '111', '111');
INSERT INTO `users` VALUES (20, '202225220111', '123456');
INSERT INTO `users` VALUES (21, '2022252201111', '123456');
INSERT INTO `users` VALUES (22, '2022252201112', '123456');

SET FOREIGN_KEY_CHECKS = 1;
