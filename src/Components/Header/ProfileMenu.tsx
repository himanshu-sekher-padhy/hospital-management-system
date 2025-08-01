import { Menu, Text, Group, Avatar } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';

const ProfileMenu = () => {
    const user= useSelector((state:any)=>state.user);
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <div className='flex items-center gap-4 cursor-pointer'>
                    <span className='font-medium text-lg text-neutral-900'>{user.name}</span>
                    <Avatar variant='filled' src="/avatar.jpg" size={45} alt="Dr.Banita Padhy" />
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>

                <Menu.Item>
                    <Group gap="xs">
                        <IconSettings size={14} />
                        <Text>Settings</Text>
                    </Group>
                </Menu.Item>

                <Menu.Item>
                    <Group gap="xs">
                        <IconMessageCircle size={14} />
                        <Text>Messages</Text>
                    </Group>
                </Menu.Item>

                <Menu.Item>
                    <Group gap="xs">
                        <IconPhoto size={14} />
                        <Text>Gallery</Text>
                    </Group>
                </Menu.Item>

                <Menu.Item rightSection={<Text size="xs" c="dimmed">⌘K</Text>}>
                    <Group gap="xs">
                        <IconSearch size={14} />
                        <Text>Search</Text>
                    </Group>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item>
                    <Group gap="xs">
                        <IconArrowsLeftRight size={14} />
                        <Text>Transfer my data</Text>
                    </Group>
                </Menu.Item>

                <Menu.Item color="red">
                    <Group gap="xs">
                        <IconTrash size={14} />
                        <Text>Delete my account</Text>
                    </Group>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileMenu;
