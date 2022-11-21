import { useState } from 'react';
import Context from './context';
import TyProps from '../types/TyProps';

export default function Provider(props:TyProps) {
    const [update, setUpdate] = useState(false);
    const dataValues = {update, setUpdate};

    return (
        <Context.Provider value = {dataValues}>
            { props.children }
        </Context.Provider>
    );
}