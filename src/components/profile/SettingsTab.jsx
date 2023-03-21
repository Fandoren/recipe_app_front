import React from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

function SettingsTab() {
    function changeInfo() {
        
    };

    function changePassword() {
    };

    function deleteAccount() {
    };

    return(
        <Container className='settings-page-info'>
            <Row className='justify-content-center'>
                <Button onClick={changeInfo} className='w-50 mt-3'>
                    Изменить информацию
                </Button>
            </Row>
            <Row className='justify-content-center'>
                <Button onClick={changePassword} className='w-50 mt-3'>
                    Поменять пароль
                </Button>
            </Row>
            <Row className='justify-content-center'>
                <Button onClick={deleteAccount} className='delete-button w-50 mt-3'>
                <FontAwesomeIcon icon={faTrashCan} /> Удалить аккаунт
                </Button>
            </Row>
        </Container>
    )
}

export default SettingsTab;