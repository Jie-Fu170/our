const express = require('express');
const path = require('path');
const app = express();

// 添加正确的 MIME 类型
app.use((req, res, next) => {
    if (req.url.endsWith('.mp3')) {
        res.type('audio/mpeg');
    }
    next();
});

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 