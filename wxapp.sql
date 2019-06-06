-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2019 年 04 月 13 日 14:13
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `wxapp`
--

-- --------------------------------------------------------

--
-- 表的结构 `food`
--

CREATE TABLE IF NOT EXISTS `food` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) NOT NULL DEFAULT '0' COMMENT '分类id',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '书籍名称',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '售卖金额',
  `main_image` varchar(100) NOT NULL DEFAULT '' COMMENT '主图',
  `summary` varchar(10000) NOT NULL DEFAULT '' COMMENT '描述',
  `stock` int(11) NOT NULL DEFAULT '0' COMMENT '库存量',
  `tags` varchar(200) NOT NULL DEFAULT '' COMMENT 'tag关键字，以","连接',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1：有效 0：无效',
  `month_count` int(11) NOT NULL DEFAULT '0' COMMENT '月销售数量',
  `total_count` int(11) NOT NULL DEFAULT '0' COMMENT '总销售量',
  `view_count` int(11) NOT NULL DEFAULT '0' COMMENT '总浏览次数',
  `comment_count` int(11) NOT NULL DEFAULT '0' COMMENT '总评论量',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间',
  `created_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '插入时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='课程表' AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `food`
--

INSERT INTO `food` (`id`, `cat_id`, `name`, `price`, `main_image`, `summary`, `stock`, `tags`, `status`, `month_count`, `total_count`, `view_count`, `comment_count`, `updated_time`, `created_time`) VALUES
(1, 9, 'web安全', '1000.00', '20190413/6e7b898ff71141cba2a8948aa53f7648.png', '<p><img src="http://127.0.0.1:8999/static/upload/20190413/04348a76bdef4412b64381d9333043b1.png"/></p>', 100, '大神,厉害,哈哈', 1, 0, 0, 0, 0, '2019-04-13 10:09:12', '2019-04-13 10:09:12'),
(2, 9, 'web安全', '1000.00', '20190413/6e7b898ff71141cba2a8948aa53f7648.png', '<p><img src="http://127.0.0.1:8999/static/upload/20190413/04348a76bdef4412b64381d9333043b1.png"/></p>', 100, '大神,厉害,哈哈', 1, 0, 0, 0, 0, '2019-04-13 10:12:49', '2019-04-13 10:12:49'),
(3, 9, 'web安全', '1000.00', '20190413/05f524c45c5040f1bafff1ace2298201.png', '<p>ewqewqewqe<br/></p>', 10, '不错,哈哈', 1, 0, 0, 0, 0, '2019-04-13 10:25:03', '2019-04-13 10:25:03'),
(4, 9, 'web安全', '100.00', '20190413/f99d16b7780a49ce8d51d826e6cf4a02.png', '<p>哈哈哈哈哈</p>', 10, '大神,王者', 1, 0, 0, 0, 0, '2019-04-13 10:26:34', '2019-04-13 10:26:34'),
(5, 9, 'web安全', '100.00', '20190413/1affaa0d0dc1423aa6ad88cc0e15e878.png', '<p>哈哈哈哈哈</p>', 10, '大神,王者', 1, 0, 0, 0, 0, '2019-04-13 13:43:55', '2019-04-13 10:30:08'),
(6, 9, 'web安全', '100.00', '20190413/f99d16b7780a49ce8d51d826e6cf4a02.png', '<p>哈哈哈哈哈</p>', 10, '大神,王者', 0, 0, 0, 0, 0, '2019-04-13 13:30:16', '2019-04-13 10:34:29');

-- --------------------------------------------------------

--
-- 表的结构 `food_cat`
--

CREATE TABLE IF NOT EXISTS `food_cat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '类别名称',
  `weight` tinyint(4) NOT NULL DEFAULT '1' COMMENT '权重',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1：有效 0：无效',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间',
  `created_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '插入时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='课程分类' AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `food_cat`
--

INSERT INTO `food_cat` (`id`, `name`, `weight`, `status`, `updated_time`, `created_time`) VALUES
(9, 'admin', 1, 0, '2019-04-13 13:22:06', '2019-04-13 07:14:01'),
(10, '吉他', 5, 1, '2019-04-13 13:22:21', '2019-04-13 13:22:21'),
(11, '钢琴', 9, 1, '2019-04-13 13:29:41', '2019-04-13 13:29:41');

-- --------------------------------------------------------

--
-- 表的结构 `food_stock_change_log`
--

CREATE TABLE IF NOT EXISTS `food_stock_change_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `food_id` int(11) NOT NULL COMMENT '商品id',
  `unit` int(11) NOT NULL DEFAULT '0' COMMENT '变更多少',
  `total_stock` int(11) NOT NULL DEFAULT '0' COMMENT '变更之后总量',
  `note` varchar(100) NOT NULL DEFAULT '' COMMENT '备注字段',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  PRIMARY KEY (`id`),
  KEY `idx_food_id` (`food_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='数据库存变更表' AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `food_stock_change_log`
--

INSERT INTO `food_stock_change_log` (`id`, `food_id`, `unit`, `total_stock`, `note`, `created_time`) VALUES
(1, 4, 10, 10, '后台修改', '2019-04-13 10:26:34'),
(2, 5, 10, 10, '后台修改', '2019-04-13 10:30:10'),
(3, 6, 10, 10, '后台修改', '2019-04-13 10:34:29'),
(4, 5, 0, 10, '后台修改', '2019-04-13 13:43:55');

-- --------------------------------------------------------

--
-- 表的结构 `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `file_key` varchar(60) NOT NULL DEFAULT '' COMMENT '文件名',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=23 ;

--
-- 转存表中的数据 `images`
--

INSERT INTO `images` (`id`, `file_key`, `created_time`) VALUES
(18, '20190413/6e7b898ff71141cba2a8948aa53f7648.png', '2019-04-13 10:06:51'),
(19, '20190413/04348a76bdef4412b64381d9333043b1.png', '2019-04-13 10:07:22'),
(20, '20190413/05f524c45c5040f1bafff1ace2298201.png', '2019-04-13 10:24:44'),
(21, '20190413/f99d16b7780a49ce8d51d826e6cf4a02.png', '2019-04-13 10:26:17'),
(22, '20190413/1affaa0d0dc1423aa6ad88cc0e15e878.png', '2019-04-13 13:43:30');

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) NOT NULL DEFAULT '' COMMENT '会员名',
  `mobile` varchar(11) NOT NULL DEFAULT '' COMMENT '会员手机号码',
  `sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别 1：男 2：女',
  `avatar` varchar(200) NOT NULL DEFAULT '' COMMENT '会员头像',
  `salt` varchar(32) NOT NULL DEFAULT '' COMMENT '随机salt',
  `reg_ip` varchar(100) NOT NULL DEFAULT '' COMMENT '注册ip',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1：有效 0：无效',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间',
  `created_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '插入时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='会员表' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `member`
--

INSERT INTO `member` (`id`, `nickname`, `mobile`, `sex`, `avatar`, `salt`, `reg_ip`, `status`, `updated_time`, `created_time`) VALUES
(1, '哈哈', '', 1, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJibQjc4u6xDfA6DMe9AvgWCgDzBaZ7X0ZDwMAOO4J9VOzBJicK2e9e94r9GibswuTA0Rl6hv0c4sqZg/132', 'vjNc2wM9aH4y72cp', '', 1, '2019-04-08 14:33:59', '2019-04-08 12:22:39');

-- --------------------------------------------------------

--
-- 表的结构 `oauth_member_bind`
--

CREATE TABLE IF NOT EXISTS `oauth_member_bind` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL DEFAULT '0' COMMENT '会员id',
  `client_type` varchar(20) NOT NULL DEFAULT '' COMMENT '客户端来源类型。qq,weibo,weixin',
  `type` tinyint(3) NOT NULL DEFAULT '0' COMMENT '类型 type 1:wechat ',
  `openid` varchar(80) NOT NULL DEFAULT '' COMMENT '第三方id',
  `unionid` varchar(100) NOT NULL DEFAULT '',
  `extra` text NOT NULL COMMENT '额外字段',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `created_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '插入时间',
  PRIMARY KEY (`id`),
  KEY `idx_type_openid` (`type`,`openid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='第三方登录绑定关系' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `oauth_member_bind`
--

INSERT INTO `oauth_member_bind` (`id`, `member_id`, `client_type`, `type`, `openid`, `unionid`, `extra`, `updated_time`, `created_time`) VALUES
(1, 1, '', 1, 'oVSQF5iJATQMwzqDQDuoS4hWZjQQ', '', '', '2019-04-08 12:22:39', '2019-04-08 12:22:39');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户uid',
  `nickname` varchar(100) NOT NULL DEFAULT '' COMMENT '用户名',
  `mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1：男 2：女 0：没填写',
  `avatar` varchar(64) NOT NULL DEFAULT '' COMMENT '头像',
  `login_name` varchar(20) NOT NULL DEFAULT '' COMMENT '登录用户名',
  `login_pwd` varchar(32) NOT NULL DEFAULT '' COMMENT '登录密码',
  `login_salt` varchar(32) NOT NULL DEFAULT '' COMMENT '登录密码的随机加密秘钥',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1：有效 0：无效',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '插入时间',
  `updated_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后一次更新时间',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `login_name` (`login_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='用户表（管理员）' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `nickname`, `mobile`, `email`, `sex`, `avatar`, `login_name`, `login_pwd`, `login_salt`, `status`, `created_time`, `updated_time`) VALUES
(1, '秦俭', '11012345679', '1677262135@qq.com', 1, '', '54php.cn', '816440c40b7a9d55ff9eb7b20760862c', 'cF3JfH5FJfQ8B2Ba', 1, '2017-03-15 06:08:48', '2019-04-05 09:32:18'),
(2, 'qinjian', '17693161291', '17693161291@163.com', 0, '', 'qinjian', '1c846b817297939155992342ae071179', 'jmAovMjl5KotaJuK', 1, '2019-04-05 10:26:25', '2019-04-08 12:48:23'),
(3, 'tangyan', '12313131', '12321321231@qq.com', 0, '', 'admin', '42d5f3715aa5e7e42eb702fb4424c461', 'JvQLm4feI1v3J7MV', 1, '2019-04-05 10:28:29', '2019-04-08 14:41:21');

--
-- 触发器 `user`
--
DROP TRIGGER IF EXISTS `update_time_at`;
DELIMITER //
CREATE TRIGGER `update_time_at` BEFORE UPDATE ON `user`
 FOR EACH ROW SET NEW.updated_time = now()
//
DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
