import { useState } from 'react';
import './App.css';
import AutoDeleteTodoList from './components/AutoDeleteTodoList';
import CreateDataFromAPI from './components/CreateDataFromAPI';

function App() {
    const [component, setComponent] = useState('list');
    return (
        <>
            <div className='flex gap-4'>
                <div className='flex flex-col w-72 sticky py-4'>
                    <a
                        className={`p-2 hover:underline cursor-pointer  duration-200 ${
                            component == 'list'
                                ? 'underline text-[#646cff]'
                                : 'text-white/50 hover:text-white'
                        }`}
                        onClick={() => setComponent('list')}
                    >
                        1.Auto Delete Todo List
                    </a>
                    <a
                        className={`p-2 hover:underline cursor-pointer duration-200 ${
                            component == 'api'
                                ? 'underline text-[#646cff]'
                                : 'text-white/50 hover:text-white'
                        }`}
                        onClick={() => setComponent('api')}
                    >
                        2.Create data from API
                    </a>
                </div>
                <div className='w-full'>
                    {component == 'list' ? (
                        <AutoDeleteTodoList />
                    ) : (
                        <CreateDataFromAPI />
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
