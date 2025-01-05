document.addEventListener('DOMContentLoaded', () => {
    // 保留原有的代码
    // 添加页面载入动画
    const memories = document.querySelectorAll('.memory');
    memories.forEach((memory, index) => {
        memory.style.opacity = '0';
        memory.style.transform = 'translateY(20px)';
        setTimeout(() => {
            memory.style.transition = 'all 0.8s ease';
            memory.style.opacity = '1';
            memory.style.transform = 'translateY(0)';
        }, index * 300);
    });

    // 添加花瓣飘落效果
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // 随机花瓣样式
        const colors = ['#ffd1dc', '#ffb6c1', '#ffc0cb', '#ff69b4'];
        const size = Math.random() * 15 + 10;
        const startPosition = Math.random() * window.innerWidth;
        const duration = Math.random() * 8 + 5;
        
        petal.style.cssText = `
            left: ${startPosition}px;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50% 0 50% 50%;
            animation-duration: ${duration}s;
        `;
        
        document.body.appendChild(petal);
        
        // 动画结束后移除花瓣
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // 定期创建花瓣
    setInterval(createPetal, 300);

    // 添加鼠标移动特效
    let timeout;
    document.addEventListener('mousemove', (e) => {
        if (timeout) return;
        timeout = setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'mini-heart';
            heart.style.left = (e.pageX - 5) + 'px';
            heart.style.top = (e.pageY - 5) + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
            timeout = null;
        }, 50);
    });

    // 添加标题打字机效果
    const title = document.querySelector('.title');
    const text = title.textContent;
    title.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 200);
        }
    }

    setTimeout(typeWriter, 1000);

    // 背景音乐控制
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.querySelector('.music-control');
    let isMusicPlaying = false;

    // 添加音频上下文
    let audioContext = null;

    // 添加更多调试事件监听
    bgMusic.addEventListener('loadstart', () => {
        console.log('开始加载音频');
    });

    bgMusic.addEventListener('loadeddata', () => {
        console.log('音频加载成功');
        musicControl.style.display = 'flex';
    });

    bgMusic.addEventListener('error', (e) => {
        console.error('音频加载失败:', e);
        console.error('错误详情:', bgMusic.error);
        musicControl.style.display = 'none';
    });

    bgMusic.addEventListener('playing', () => {
        console.log('音频开始播放');
    });

    // 改进的音乐控制点击处理
    musicControl.addEventListener('click', async () => {
        console.log('点击音乐控制按钮');
        try {
            // 初始化音频上下文（需要用户交互）
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                await audioContext.resume();
            }

            if (isMusicPlaying) {
                console.log('尝试暂停音乐');
                await bgMusic.pause();
                musicControl.innerHTML = '<i class="fas fa-music"></i>';
                console.log('音乐已暂停');
            } else {
                console.log('尝试播放音乐');
                // 设置音量渐入
                bgMusic.volume = 0;
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('音乐播放成功');
                        // 音量渐入效果
                        let vol = 0;
                        const fadeIn = setInterval(() => {
                            if (vol < 1) {
                                vol += 0.1;
                                bgMusic.volume = vol;
                            } else {
                                clearInterval(fadeIn);
                            }
                        }, 100);
                        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
                    }).catch(error => {
                        console.error('播放失败:', error);
                        musicControl.innerHTML = '<i class="fas fa-music"></i>';
                        isMusicPlaying = false;
                    });
                }
            }
            isMusicPlaying = !isMusicPlaying;
        } catch (error) {
            console.error('音乐控制错误:', error);
        }
    });

    // 计算在一起的时间
    function updateCounter() {
        // 修改为你们在一起的日期：2019年10月1日
        const startDate = new Date('2019-10-01');
        const now = new Date();
        const diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.getElementById('years').textContent = years;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
    }

    // 每秒更新一次计数器
    setInterval(updateCounter, 1000);
    updateCounter();

    // 添加随机飘浮文字
    function createFloatingWord() {
        const words = ['永远爱你', '一生一世', '执子之手', '与子偕老', '情深似海', '白首不分离'];
        const word = document.createElement('span');
        word.textContent = words[Math.floor(Math.random() * words.length)];
        word.style.left = Math.random() * 80 + 10 + '%';
        document.querySelector('.floating-words').appendChild(word);

        setTimeout(() => {
            word.remove();
        }, 15000);
    }

    // 每3秒创建一个新的飘浮文字
    setInterval(createFloatingWord, 3000);

    // 页面加载完成后预加载音频
    bgMusic.load();
});

