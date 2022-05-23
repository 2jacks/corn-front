import React from 'react';
import './ToolButton.scss'

import {Button} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";

import {useDispatch} from "react-redux";
import {setActiveAnalysisTool} from "../../../../../store/features/analysis/analysisSlice";

const ToolButton = ({header, toolKey}) => {
   const dispatch = useDispatch()
   const _onButtonClick = () => {
      dispatch(setActiveAnalysisTool({toolKey}))
   }

   return (
     <button className={'tool-item'} onClick={_onButtonClick}>
        <h3 className={'tool-item__header'}>{header}</h3>
        <CaretRightOutlined/>
     </button>
   );
};

export {ToolButton};
