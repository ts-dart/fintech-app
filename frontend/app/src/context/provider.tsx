import Context from './context';
import TyProps from '../types/TyProps';

export default function Provider(props:TyProps) {
    return (
        <Context.Provider value = {''}>
            { props.children }
        </Context.Provider>
    );
}