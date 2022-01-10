import React, {ChangeEvent} from 'react';

type PropsType = {
    value: number
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
    style: string
}


export const Input = (props: PropsType) => {
    return (
        <div>
            <input
                type="number"
                value={props.value}
                onChange={props.onChange}
                className={props.style}
            />
        </div>
    );
};

