-- SQL Insert statements created through a mysql dump, used then to seed the techly Jawsdb remotely, through the MSQL Workbench SQL editor.
-- created by, for questions, contact by https://github.com/ktrnthsnr


--      This sample start script will update the homepage 
--      with a few sample users\posts\comments\votes
--------------------------------------------------------------------------

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ed','ed@gmail.com','$2b$10$G8IhpFr58MKzznDKWst.t.p665UiBcuuyp/MYM5kmX6xsvLtT1jF2','','',''),(2,'Mary','mary@gmail.com','$2b$10$BcjfANEtxK7gTwBgpKR7aOVXgIrBu3N1lCkPNvsTLz99aWkp7jo8m','','',''),(3,'Safron','safron@gmail.com','$2b$10$dVM3vKf5OAzkjVTm8tYm3ePX5GCJlresYg4vzp9fxWHx1jdunudky','','',''),(4,'Sonia','sonia@company.ca','$2b$10$4zcnvNjRaIZn29MpB5Prz.uqHFvrOgSifC0MBNIjLO7ULYi1WxYba','','',''),(5,'Fred','fred@live.com','$2b$10$lxuXdHIqiy3H5mtXZSm7HeQW1IOqlwf1LenN4t8FDld1h3S0L/IBm','','',''),(6,'Sue','sue@techshop.com','$2b$10$0iVFEoA633M5.NTQeD8uAeixzV1b7Yh8XWGR3YKom1hTyTDGEdY3m','','','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Insomnia is giving me this error: 503 service unavailable, any ideas?',2,'2020-06-24 06:58:03','2020-06-24 06:58:03'),(2,'Thanks, Ed, that helped!  ',2,'2020-06-24 07:00:45','2020-06-24 07:00:45'),(3,'Anyone had this error on Heroku logs tail?  This page isn’t workingtechly.herokuapp.com didn’t send any data. ERR_EMPTY_RESPONSE',5,'2020-06-24 07:04:11','2020-06-24 07:04:11'),(4,'Techly is live!',4,'2020-06-24 07:10:44','2020-06-24 07:10:44');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'That may be there are no tables created. Try to recreate tables in Heroku, and redeploy',1,1,'2020-06-24 06:59:34','2020-06-24 06:59:34'),(2,'Try: git add -A and git commit -m prior to running git push heroku master',6,3,'2020-06-24 07:08:13','2020-06-24 07:08:13'),(3,'Thanks, that worked!!',5,3,'2020-06-24 07:09:19','2020-06-24 07:09:19'),(4,'Congrats!',1,4,'2020-06-24 07:11:11','2020-06-24 07:11:11');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (4,1,4),(1,2,2),(3,5,3);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
