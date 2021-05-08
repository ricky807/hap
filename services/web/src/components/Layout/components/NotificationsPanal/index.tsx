import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import { closePanal } from '../../../../redux/notifications/notificationActions';

import { useHistory } from 'react-router-dom';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import RenderNotifications from './components/RenderNotifications';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from '../../../../styles/Layout/notificationspanal.module.css';

export default function Index() {
  const dispatch = useDispatch();

  const { isPanalOpen, notifications } = useSelector(
    state => state.notifications
  );

  const close = () => dispatch(closePanal());

  const handleClickAway = () => {
    if (!isPanalOpen) return;
    close();
  };

  return (
    <div>
      <AnimatePresence>
        {isPanalOpen && (
          <motion.div
            className={styles.container}
            initial={{ x: '+100%', opacity: 0 }}
            animate={{ x: '-2%', opacity: 1 }}
            exit={{ x: '+100%', opacity: 0 }}
            transition={{ type: 'tween' }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <Panal
                  isPanalOpen={isPanalOpen}
                  notifications={notifications}
                  close={close}
                />
              </div>
            </ClickAwayListener>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Panal = ({ isPanalOpen, notifications, close }) => {
  return (
    <>
      <div className={styles.closePanal} onClick={close}>
        <KeyboardReturnIcon />
      </div>
      <div className={styles.notifications}>
        <RenderNotifications notifications={notifications} />
      </div>
    </>
  );
};
