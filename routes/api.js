var express = require('express');
var router = express.Router();


const famousArray = [
  {
    name: "5G應用",
    count: 1
  },
  {
    name: "前端",
    count: 1
  },
  {
    name: "職場溝通",
    count: 1
  },
]
const recentArray = ["前端", "5G應用", "職場溝通", "tis", "數位學堂"]

/* GET famousArray. */
router.get('/famousCourse', function (req, res, next) {
  res.status(200)
  res.send({
    success: true,
    famousArray
  })
  res.end()
});

/* GET recentArray. */
router.get('/recentCourse', function (req, res, next) {
  res.status(200)
  res.send({
    success: true,
    recentArray
  })
  res.end()
});
/* Post recentArray. */
router.post('/recentCourse', function (req, res, next) {
  const course = req.body
  let success = true
  if (course['keywords'] === undefined) {
    success = false
    res.send({
      success,
      error: "傳入格式錯誤，請傳keywords:[]"
    })
    res.end()
    return
  }
  course.keywords.forEach((item, index) => {
    if (recentArray.indexOf(item) === -1) {
      recentArray.pop()
      recentArray.unshift(item)
    } else {
      recentArray.splice(recentArray.indexOf(item), 1)
      console.log(recentArray);
      recentArray.unshift(item)
    }
  })

  res.send({
    success,
    recentArray
  })
  res.end()
});

/* delete recentArray. */
router.delete('/recentCourse/:name', function (req, res, next) {
  const course = req.params.name
  let success = true
  console.log(course);
  recentArray.forEach((item, index) => {
    if (item === course) {
      recentArray.splice(index, 1)
    } else {
      success = false
      res.send({
        success,
        error: `最近搜尋沒有 ${course} 此關鍵字`
      })
      res.end()
      return
    }
  })

  res.send({
    success,
    recentArray
  })
  res.end()
});

module.exports = router;
