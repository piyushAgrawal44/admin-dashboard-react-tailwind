import React from 'react';

export default function Card(props) {

    return (
        <div className={`bg-white shadow rounded-lg p-2 w-full xm:w-[calc(50%-6px)] md:w-[calc(25%-6px)]`}>
            <div className=" ">
                <div className="max-w-[50px] bg-gray-200 rounded-full p-3 hover:p-2">
                    <img className='max-w-full' src={props.imgName} alt="img" />
                </div>
                <p className="mt-2 px-2 font-medium text-3xl">{props.value} </p>
                <h5 className="px-2 text-sm text-gray-500">{props.title}</h5>

            </div>
        </div>
    )

}
