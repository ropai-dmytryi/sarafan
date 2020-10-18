import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { IUser } from 'model/IUser';
import { Link } from 'react-router-dom';

interface IFindByNameProps {
    getUserByName: (userName: string) => any;
}

export const FindByName = (props: IFindByNameProps) => {

    const [users, setUsers] = React.useState<IUser[]>([]);

    const findUser = (userName: string) => {
        if (userName) {
            props.getUserByName(userName).then((users: IUser[]) => setUsers(users));
        }
    };

    return (
        <div>
            <Autocomplete
                freeSolo
                style={ { width: 300 } }
                options={ users }
                onInputChange={ (event, newInputValue) => {
                    if (event.type === 'change') {
                        findUser(newInputValue);
                    }
                } }
                renderOption={ (option: IUser) => (
                    <Link to={ `/profile/${ option.id }` }>{ option.name }</Link>
                ) }
                getOptionLabel={ (option: IUser) => option.name }
                renderInput={ (params) => <TextField { ...params } label="Find user" variant="outlined"/> }
            />
        </div>
    );
};
