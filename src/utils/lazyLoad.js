export function lazyLoad(el) {
    /**
     * 判断元素是否出现在视口中
     * @param {*} ele 
     * @returns 
     */
    function inView(ele) {
        let rect = ele.getBoundingClientRect();
        if (rect.left > 0 && rect.left < window.innerWidth && rect.top > 0 && rect.top < window.innerHeight) {
            return true;
        }
        return false;
    }

    /** 
     * 判断元素是否被加载
     * @param {*} ele
     * @returns
     */
    function isDeal(ele) {
        return ele.src == ele.dataset.src;
    }

    function deal() {
        let nodes = [...document.querySelectorAll('img[data-src]')]
        nodes.forEach(item=>{
            // 当图片没有加载给一个默认图片
            item.src = 'http://webjike.com/upload/images/2018/4/7f47a94504cc79a5.gif';
            // 如果图片出现在视口中且没有被加载
            if (inView(item) && !isDeal(item)) {
                item.src = item.dataset.src
            }
        })
    }

    deal();

    if (el) {
        document.querySelector(el).addEventListener('scroll',deal)
    } else {
        window.onscroll = deal;
    }
}