import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { IUser } from 'model/IUser';
import { Link } from 'react-router-dom';

interface IFindByNameProps {
    getUserByName: (userName: string) => any;
}

interface IFindByNameState {
    users: IUser[];
}

export class FindByName extends React.Component<IFindByNameProps, IFindByNameState> {

    public state: any = {
        users: [],
    };

    private findUser = (userName: string) => {
        if (userName) {
            this.props.getUserByName(userName).then((users: IUser[]) => this.setState({ users }));
        }
    }

    public render() {
        const options: IUser[] = this.state.users;

        return (
            <div>
                <Autocomplete
                    freeSolo
                    style={ { width: 300 } }
                    options={ options }
                    onInputChange={ (event, newInputValue) => {
                        if (event.type === 'change') {
                            this.findUser(newInputValue);
                        }
                    } }
                    renderOption={ (option: IUser) => (
                        <Link to={ `/profile/${ option.id }` }>{ option.name }</Link>
                    ) }
                    getOptionLabel={ (option: IUser) => option.name }
                    renderInput={ (params) =>  <TextField { ...params } label="Find user" variant="outlined" /> }
                />
            </div>
        );
    }
}
