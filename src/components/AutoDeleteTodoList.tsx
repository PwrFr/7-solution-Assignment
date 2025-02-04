import { useRef, useState } from 'react';

function AutoDeleteTodoList() {
    type List = {
        type: string;
        name: string;
    };

    const [toDoList, setToDoList] = useState<List[]>([
        {
            type: 'Fruit',
            name: 'Apple',
        },
        {
            type: 'Vegetable',
            name: 'Broccoli',
        },
        {
            type: 'Vegetable',
            name: 'Mushroom',
        },
        {
            type: 'Fruit',
            name: 'Banana',
        },
        {
            type: 'Vegetable',
            name: 'Tomato',
        },
        {
            type: 'Fruit',
            name: 'Orange',
        },
        {
            type: 'Fruit',
            name: 'Mango',
        },
        {
            type: 'Fruit',
            name: 'Pineapple',
        },
        {
            type: 'Vegetable',
            name: 'Cucumber',
        },
        {
            type: 'Fruit',
            name: 'Watermelon',
        },
        {
            type: 'Vegetable',
            name: 'Carrot',
        },
    ]);

    const [fruitList, setFruitList] = useState<List[]>([]);
    const [vegetableList, setVegetableList] = useState<List[]>([]);
    const timeoutRef = useRef<{ [key: string]: number }>({});

    const onClickMainItem = (item: List, index: number): void => {
        setToDoList((prev) => prev.filter((_, i) => i !== index));

        if (item.type == 'Fruit') {
            setFruitList((prev) => [...prev, item]);

            const timeoutId = setTimeout(() => {
                setFruitList((prev) => prev.filter((el) => el !== item));
                setToDoList((prev) => [...prev, item]);
                delete timeoutRef.current[item.name];
            }, 5000);
            timeoutRef.current[item.name] = timeoutId;
        } else {
            setVegetableList((prev) => [...prev, item]);

            const timeoutId = setTimeout(() => {
                setVegetableList((prev) => prev.filter((el) => el !== item));
                setToDoList((prev) => [...prev, item]);
                delete timeoutRef.current[item.name];
            }, 5000);
            timeoutRef.current[item.name] = timeoutId;
        }
    };

    const onCancel = (item: List): void => {
        clearTimeout(timeoutRef.current[item.name]);
        delete timeoutRef.current[item.name];
        if (item.type == 'Fruit') {
            setFruitList((prev) => prev.filter((el) => el !== item));
        } else {
            setVegetableList((prev) => prev.filter((el) => el !== item));
        }
        setToDoList((prev) => [...prev, item]);
    };

    return (
        <>
            <h1 className='font-medium'>1.Auto Delete Todo List</h1>
            <hr className='my-2' />
            <div className='grid grid-cols-3 gap-4 items-start'>
                <div className='grid gap-2 '>
                    {toDoList.map((el, i) => (
                        <div
                            onClick={() => onClickMainItem(el, i)}
                            key={i}
                            className='border rounded p-2 hover:bg-white/10 duration-200 cursor-pointer'
                        >
                            {el.name}
                        </div>
                    ))}
                </div>
                <div className='border rounded min-h-[70dvh]'>
                    <div className='p-2 border-b bg-[#646cff]'>Fruit</div>
                    <div className='grid gap-2 items-start p-2 '>
                        {fruitList.map((el, i) => (
                            <div
                                onClick={() => onCancel(el)}
                                key={i}
                                className='border rounded p-2 hover:bg-white/10 duration-200 cursor-pointer'
                            >
                                {el.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border rounded min-h-[70dvh]'>
                    <div className='p-2 border-b bg-[#646cff]'>Vegetable</div>
                    <div className='grid gap-2 items-start p-2'>
                        {vegetableList.map((el, i) => (
                            <div
                                onClick={() => onCancel(el)}
                                key={i}
                                className='border rounded p-2 hover:bg-white/10 duration-200 cursor-pointer'
                            >
                                {el.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AutoDeleteTodoList;
