import React, {useState} from 'react';

import {API_URL} from "../../../../../../constants/BACKEND";

import {Button, Form, Select} from 'antd';

import {useDispatch, useSelector} from "react-redux";
import {selectAllFields} from "../../../../../../store/features/fields/fieldsSlice";
import {selectResearchesByFieldId} from "../../../../../../store/features/researches/researchesSlice";
import {setMapMode, setMapData} from "../../../../../../store/features/analysis/analysisSlice";

const SideBySideForm = ({onSubmit}) => {
   const dispatch = useDispatch()
   const user = useSelector(state => state.user)
   const fields = useSelector(selectAllFields)
   const [selectedField, setSelectedField] = useState(null)
   const researches = useSelector(state => selectResearchesByFieldId(state, selectedField))


   const fieldSelectOptions = fields.map(field =>
     <Select.Option value={field.id}>{field.properties.name}</Select.Option>
   )
   const researchesSelectOptions = researches.map(research =>
     <Select.Option value={research.id}>{research.date}</Select.Option>
   )
   return (
     <Form
       className={'tool-form'}
       labelCol={{
          span: 10,
       }}
       labelAlign={'left'}
       // wrapperCol={{
       //    span: 12,
       // }}
       layout="horizontal"
       initialValues={{
          size: 'default',
       }}
       // onValuesChange={onFormLayoutChange}
       size={'default'}
       onFinish={(values) => onSubmit(values)}
     >
        <Form.Item label="Поле" name={'field'}>
           <Select onChange={(e) => setSelectedField(e)}>
              {fieldSelectOptions}
           </Select>
        </Form.Item>

        <Form.Item label="NDVI слева" name={'res_1'}>
           <Select>{researchesSelectOptions}</Select>
        </Form.Item>

        <Form.Item label="NDVI справа" name={'res_2'}>
           <Select>{researchesSelectOptions}</Select>
        </Form.Item>

        <Form.Item label="">
           <Button type="primary" htmlType="submit">
              Включить шторку
           </Button>
        </Form.Item>

     </Form>
   );
};

export {SideBySideForm};
