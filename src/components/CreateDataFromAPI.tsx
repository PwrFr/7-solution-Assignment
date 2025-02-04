import { useEffect, useState } from 'react';

function CreateDataFromAPI() {
    useEffect(() => {
        getData();
    }, []);

    type Department = {
        [key: string]: {
            male: number;
            female: number;
            ageRange: string;
            hair: {
                [key: string]: number;
            };
            addressUser: {
                [key: string]: string;
            };
        };
    };

    const [data, setData] = useState<Department>();
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        try {
            const resData = await fetch(
                'https://dummyjson.com/users?limit=500'
            );
            const data = await resData.json();
            setLoading(false);

            const obj: Department = {};
            data.users.forEach(
                (user: {
                    company: {
                        department: string;
                    };
                    age: string;
                    gender: 'male' | 'female';
                    hair: {
                        color: string;
                    };
                    firstName: string;
                    lastName: string;
                    address: {
                        postalCode: string;
                    };
                }) => {
                    if (!obj[user.company.department]) {
                        obj[user.company.department] = {
                            male: 0,
                            female: 0,
                            ageRange: `${user.age}-${user.age}`,
                            hair: {},
                            addressUser: {},
                        };
                    } else {
                        if (user.gender == 'male') {
                            obj[user.company.department].male += 1;
                        } else {
                            obj[user.company.department].female += 1;
                        }

                        const [minAge, maxAge] =
                            obj[user.company.department].ageRange.split('-');

                        obj[user.company.department].ageRange = `${
                            user.age < minAge ? user.age : minAge
                        }-${user.age > maxAge ? user.age : maxAge}`;

                        if (
                            !obj[user.company.department].hair[user.hair.color]
                        ) {
                            obj[user.company.department].hair[
                                user.hair.color
                            ] = 0;
                        }
                        obj[user.company.department].hair[user.hair.color] += 1;

                        obj[user.company.department].addressUser[
                            `${user.firstName}${user.lastName}`
                        ] = user.address.postalCode;
                    }
                }
            );

            setData(obj);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1 className='font-medium'>2.Create data from API</h1>
            <hr className='my-2' />
            {loading ? (
                'Fetching...'
            ) : (
                <pre className='p-10 bg-slate-800 text-white rounded-xl h-[80dvh] overflow-y-auto text-left'>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </>
    );
}

export default CreateDataFromAPI;
