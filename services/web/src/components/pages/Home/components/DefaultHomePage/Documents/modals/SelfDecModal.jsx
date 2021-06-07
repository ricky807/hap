import { useState } from 'react';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { Modal, Typography, Button, Checkbox } from 'antd';
const { Paragraph, Title } = Typography;

const SelfDecModal = ({
  selfDecModalVisibility,
  handleCancel,
  handleSelfDecAccept,
  selectedCategory,
  request,
  updateLocalStatuses,
  tableData,
}) => {
  const [checked, setChecked] = useState(false);

  //Adding place holder doc now as confirmation the user completed this process.
  //Will be replaced with PDF via panda Doc
  const placeHolderDoc = {
    requestId: request.id,
    name: 'self_declaration.pdf',
    type: 'application/pdf',
    location: process.env.REACT_APP_PLACEHOLDER_LOCATION,
    key: process.env.REACT_APP_PLACEHOLDER_KEY,
    category: selectedCategory,
    status: 'optOut',
  };

  const postSelfDecPlaceholder = async () => {
    try {
      await axiosWithAuth()
        .post('/documents', placeHolderDoc)
        .then(res => res.data);

      updateLocalStatuses(tableData, selectedCategory, 'optOut');
    } catch (error) {
      alert('Error saving self declaration');
    }
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Self-Declaration</Title>}
        visible={selfDecModalVisibility}
        bodyStyle={{ height: '20vh' }}
        onCancel={handleCancel}
        footer={[
          <>
            <Button
              onClick={() => {
                handleCancel();
                setChecked(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!checked}
              type="primary"
              danger
              onClick={() => {
                postSelfDecPlaceholder();
                handleSelfDecAccept();
                setChecked(false);
              }}
            >
              Submit
            </Button>
          </>,
        ]}
      >
        <Paragraph>
          By clicking below I am stating that I am unable to provide
          documentation for category: {selectedCategory}. And that I am prepared
          to provide a detailed explanation of my current status in lieu of
          providing documentation.
        </Paragraph>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
          I have read and understand the statement above
        </Checkbox>
      </Modal>
    </>
  );
};

export default SelfDecModal;