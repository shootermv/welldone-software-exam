import React,{useState} from 'react';

import Header from './Header';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


function Categories() {
    const [checked, setChecked] = useState([0]);
    const [categories, setCategory] = useState(['restaurant', 'coffe', 'hiking']);
    const handleToggle = value => () => {
      setChecked([value]);
    };
   
    return (
            <div>
                <Header title="Categories" />
                <List>
                {categories.map(value => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />

                        </ListItem>
                    )
                
                })}
                </List>            
            </div>
        )
    
}

export default Categories
