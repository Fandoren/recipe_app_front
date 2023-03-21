import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import InfoTab from './InfoTab';
import RecipeTab from './RecipeTab';
import SettingsTab from './SettingsTab';
import ProductTab from './ProductTab';
import TagTab from './TagTab';

function ProfilePage() {
    return(
        <Container className='profile-page'>
            <Tabs>
                <Tab eventKey="info" title="О Вас">
                    <InfoTab/>
                </Tab>
                <Tab eventKey="recipes" title="Рецепты">
                    <RecipeTab/>
                </Tab>
                <Tab eventKey="products" title="Продукты">
                    <ProductTab/>
                </Tab>
                <Tab eventKey="tags" title="Тэги">
                    <TagTab/>
                </Tab>
                <Tab eventKey="users" title="Пользователи">
                    Вкладка для администрации - все пользователи в системе
                </Tab>
                <Tab eventKey="bmi" title="ИМТ">
                    Вкладка, на которой указан ИМТ пользователя, возможность ввести новые данные, рекомендации, графики
                </Tab>
                <Tab eventKey="settings" title="Настройки">
                    <SettingsTab/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default ProfilePage;