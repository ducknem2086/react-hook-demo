import React from "react";



const Select = React.memo(({data, disabled, title, onChange, onClick}: {
    data: any[],
    disabled: boolean,
    title: string,
    onChange: () => void
    onClick: () => void
}) => {
    return <>
        <select onChange={onChange} onClick={onClick}>
            {data.length && data.map((item, index) =>
                (<option key={index}>{item}</option>)
            )}
        </select>
    </>
})
export default Select;