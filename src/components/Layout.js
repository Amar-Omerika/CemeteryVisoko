import React from 'react';
import Header from './Header';
import Container from './Container';

const Layout = ({
  style = null,
  children,
  hasBackButton = false,
  onLeftIconPress,
  leftIcon,
  onRightButtonPress,
  rightIcon,
  noRightIcon = false,
  logoComponent = null, // pass a custom logo component
  backButtonIconColor = 'white', // customize the back button icon color
  infoIconColor = 'white', // customize the info icon color
  headerContainerStyle = null, // apply custom styles to the header container
  leftContainerStyle = null, //  apply custom styles to the left container
  centerContainerStyle = null, // apply custom styles to the center container
  rightContainerStyle = null, // apply custom styles to the right container
}) => {
  return (
    <Container style={style}>
      <Header
        hasBackButton={hasBackButton}
        onLeftIconPress={onLeftIconPress}
        leftIcon={leftIcon}
        onRightButtonPress={onRightButtonPress}
        rightIcon={rightIcon}
        noRightIcon={noRightIcon}
        logoComponent={logoComponent}
        backButtonIconColor={backButtonIconColor}
        infoIconColor={infoIconColor}
        headerContainerStyle={headerContainerStyle}
        leftContainerStyle={leftContainerStyle}
        centerContainerStyle={centerContainerStyle}
        rightContainerStyle={rightContainerStyle}
      />
      {children}
    </Container>
  );
};

export default Layout;
