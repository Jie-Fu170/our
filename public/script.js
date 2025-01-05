document.addEventListener('DOMContentLoaded', () => {
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
}); 