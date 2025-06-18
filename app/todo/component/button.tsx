import React, { useLayoutEffect } from "react";

/**
 /**
 * về nguyên lý nếu 1 giá trị trong props bị gắn lại giá trị mới thì cái fn gốc này đểu được
 * chạy lại, và tất nhiên mọi chỗ khác đều implelemt nó đều đọc lại
 */

const ButtonComponent = React.memo(({clickEvent, title, disabled}: {
    clickEvent: (event: Event | any) => void,
    title: string,
    disabled?: boolean,
}) => {
    const [style, setStyle] = React.useState('bg-red-200');
    useLayoutEffect(() => {
        console.log('btn', title)
    })

    const renderStyle = () => {
        return style
    }


    const triggerEvent = (e: Event | any) => {
        setStyle((styleValue: string) => styleValue === 'bg-red-500' ? 'bg-orange-700' : 'bg-red-500');
        clickEvent(e)
    }
    useLayoutEffect(() => {
        console.log('title has changed !!', title)
    }, [title])
    return (<button className={`px-4 py-3 text-black ${renderStyle()} rounded-3xl`} onClick={triggerEvent}
                    disabled={disabled}>{title}</button>)
}, (prev, next) => {
    /**
     * hàm này trả về false thì component mới render lại , còn nếu là true thì không render .
     * ví dụ : nếu sửa chỗ này là title trước và title sau thì mỗi lần title thay đổi
     * thì dom không render lại -> không cập nhật giá trị vì biểu thức trả về true
     */
    const result = next.title === prev.title;
    console.log('is not render ', result);
    return result
})
export default ButtonComponent
