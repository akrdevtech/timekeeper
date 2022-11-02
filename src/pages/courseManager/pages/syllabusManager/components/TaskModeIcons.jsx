import React from 'react'
import GlobalEnums from '../../../../../contexts/global/Enums';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ArticleIcon from '@mui/icons-material/Article';
import Writing1Icon from '../../../../../components/icons/Writing1Icon';
import Writing2Icon from '../../../../../components/icons/Writing2Icon';

const TaskModeIcons = ({ mode, ...props }) => {
    const { tasks: { modes } } = GlobalEnums;

    switch (mode) {
        case modes.LISTENING: return <VolumeUpIcon {...props} />
        case modes.SPEAKING: return <KeyboardVoiceIcon {...props} />
        case modes.READING: return <ArticleIcon {...props} />
        case modes.WRITING.ONE: return <Writing1Icon {...props} />
        case modes.WRITING.TWO: return <Writing2Icon {...props} />
        default: return <></>
    }
}

export default TaskModeIcons