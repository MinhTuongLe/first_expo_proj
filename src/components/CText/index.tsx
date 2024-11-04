/**
 * @Description: ./src/components/text
 * @CreatedAt: 31/10/2019
 * @Author: ZiniSoft
 */
/* LIBRARY */
import React, { useEffect, useState } from "react";
import { Text, Animated } from "react-native";
import { connect } from "react-redux";
/** COMMON */
import i18n from "../../config/language/i18n";

const CText = ({
  style,
  i18nKey,
  animated,
  upperCase,
  numberOfLines,
  onPress,
  language,
  children,
}) => {
  const [_i18n, setI18n] = useState(i18n);

  useEffect(() => {
    if (language) {
      setMainLocaleLanguage(language);
    }
  }, [language]);

  const setMainLocaleLanguage = (language) => {
    _i18n.locale = language;
    setI18n({ ..._i18n });
  };

  const renderContent = () => {
    const content = i18nKey ? _i18n.t(i18nKey) : children;
    return upperCase ? content.toUpperCase() : content;
  };

  const TextComponent = animated ? Animated.Text : Text;

  return (
    <TextComponent
      style={style}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {renderContent()}
    </TextComponent>
  );
};

CText.defaultProps = {
  style: {},
  i18nKey: "",
  animated: false,
  upperCase: false,
  numberOfLines: 1,
};

const mapStateToProps = (state) => ({
  language: state.language.language,
});

export default connect(mapStateToProps)(CText);
