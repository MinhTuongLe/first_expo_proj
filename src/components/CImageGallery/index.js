/**
 * @Description: Custom Image Galary
 * @Created by ZiniTeam
 * @Date create: 21/01/2019
 */
/* LIBRARY */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
/** COMMON **/
import {DEVICE, CONFIG} from '../../config';
import Helpers from '../../helpers';
/** COMPONENTS **/
import CImage from '../CImage';
import Lightbox from '../CPopup/Lightbox';
import styles from '../../screens/partials/header_bar/style';

const TYPE_GALARY = {
  ONE_PIC: 1,
  TWO_PIC: 2,
  THREE_PIC: 3,
};

const SPRING_CONFIG = {
  TENSION: 500000,
  FRICTION: 500000,
};

/** DECLARE CLASS */
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this._data = props.data;
    this._photoCount = props.photoCount;
  }

  render() {
    let _randomTypeShow = -1;
    if (this._photoCount == 2) {
      _randomTypeShow = 1;
    } else if (this._photoCount >= 3) {
      _randomTypeShow = 1;
    }

    if (this._photoCount === TYPE_GALARY.ONE_PIC && _randomTypeShow === -1) {
      // 1 photo
      return (
        <Lightbox
          style={styles.mb_10}
          underlayColor={'black'}
          springConfig={{
            tension: SPRING_CONFIG.TENSION,
            friction: SPRING_CONFIG.FRICTION,
          }}
          swipeToDismiss={false}
          renderContent={() => <RenderSwiper data={this._data} curIndex={0} />}>
          <CImage
            style={{
              height: DEVICE.width,
              width: '100%',
              padding: DEVICE.s * 5,
            }}
            src={{
              uri:
                CONFIG.host +
                this._data[0].thumbnail.sizes.medium_square.path.replace(
                  'assets',
                  '',
                ),
            }}
            resizeMode={'cover'}
          />
        </Lightbox>
      );
    } else if (
      this._photoCount === TYPE_GALARY.TWO_PIC &&
      _randomTypeShow === 0
    ) {
      // 2 photo horizontal
      return (
        <View
          style={{
            flexDirection: 'row',
            height: DEVICE.width,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '100%', width: '49.5%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host +
                  this._data[0].thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <Lightbox
            style={{height: '100%', width: '49.5%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={1} />
            )}>
            <CImage
              style={{height: '100%', width: '100%', borderRadius: 20}}
              src={{
                uri:
                  CONFIG.host +
                  this._data[1].thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'cover'}
            />
          </Lightbox>
        </View>
      );
    } else if (
      this._photoCount === TYPE_GALARY.TWO_PIC &&
      _randomTypeShow === 1
    ) {
      // 2 photo vertical
      return (
        <View
          style={{
            flexDirection: 'column',
            height: DEVICE.width,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '49.5%', width: '100%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host +
                  this._data[0].thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <Lightbox
            style={{height: '49.5%', width: '100%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={1} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host +
                  this._data[1].thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'cover'}
            />
          </Lightbox>
        </View>
      );
    } else if (
      this._photoCount === TYPE_GALARY.TWO_PIC &&
      _randomTypeShow === 2
    ) {
      // 2 photo square
      return (
        <View
          style={{
            flexDirection: 'row',
            height: Helpers.hS('25%'),
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '100%', width: '49.5%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host +
                  this._data[0].thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <Lightbox
            style={{height: '100%', width: '49.5%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={1} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host +
                  this._data[1].thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'cover'}
            />
          </Lightbox>
        </View>
      );
    } else if (
      this._photoCount >= TYPE_GALARY.THREE_PIC &&
      _randomTypeShow === 0
    ) {
      // 3 photo horizontal, with first photo is large
      return (
        <View
          style={{
            flexDirection: 'row',
            height: DEVICE.width,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '100%', width: '68%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host + this._data[0].thumbnail.sizes.medium_large.path,
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View
            style={{
              height: '100%',
              width: '31%',
              justifyContent: 'space-between',
            }}>
            <Lightbox
              style={{height: '49.5%', width: '100%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={1} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[1].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{height: '49.5%', width: '100%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={2} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[2].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 && (
              <Lightbox
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  position: 'absolute',
                  bottom: 0,
                  height: '49.5%',
                  width: '100%',
                }}
                underlayColor={'black'}
                springConfig={{
                  tension: SPRING_CONFIG.TENSION,
                  friction: SPRING_CONFIG.FRICTION,
                }}
                swipeToDismiss={false}
                renderContent={() => (
                  <RenderSwiper data={this._data} curIndex={2} />
                )}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: Helpers.fS(30),
                      fontFamily: DEVICE.fontBold,
                      color: '#ffffff',
                    }}>
                    +{this._photoCount - 3}
                  </Text>
                </View>
              </Lightbox>
            )}
          </View>
        </View>
      );
    } else if (
      this._photoCount >= TYPE_GALARY.THREE_PIC &&
      _randomTypeShow === 1
    ) {
      // 3 photo vertical, with first photo is large
      return (
        <View
          style={{
            flexDirection: 'column',
            height: DEVICE.width,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '68%', width: '100%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host + this._data[0].thumbnail.sizes.medium_large.path,
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View
            style={{
              flexDirection: 'row',
              height: '31%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Lightbox
              style={{height: '100%', width: '49.5%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={1} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[1].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{height: '100%', width: '49.5%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={2} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[2].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 && (
              <Lightbox
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  position: 'absolute',
                  right: 0,
                  height: '100%',
                  width: '49.5%',
                }}
                underlayColor={'black'}
                springConfig={{
                  tension: SPRING_CONFIG.TENSION,
                  friction: SPRING_CONFIG.FRICTION,
                }}
                swipeToDismiss={false}
                renderContent={() => (
                  <RenderSwiper data={this._data} curIndex={2} />
                )}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: Helpers.fS(30),
                      fontFamily: DEVICE.fontBold,
                      color: '#ffffff',
                    }}>
                    +{this._photoCount - 3}
                  </Text>
                </View>
              </Lightbox>
            )}
          </View>
        </View>
      );
    } else if (
      this._photoCount >= TYPE_GALARY.THREE_PIC &&
      _randomTypeShow === 2
    ) {
      // 3 photo horizontal and square
      return (
        <View
          style={{
            flexDirection: 'row',
            height: DEVICE.width,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '100%', width: '49.5%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
              }}
              src={{
                uri:
                  CONFIG.host + this._data[0].thumbnail.sizes.medium_large.path,
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View
            style={{
              height: '100%',
              width: '49.5%',
              justifyContent: 'space-between',
            }}>
            <Lightbox
              style={{height: '49.5%', width: '100%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={1} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[1].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{height: '49.5%', width: '100%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={2} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[2].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 && (
              <Lightbox
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  position: 'absolute',
                  bottom: 0,
                  height: '49.5%',
                  width: '100%',
                }}
                underlayColor={'black'}
                springConfig={{
                  tension: SPRING_CONFIG.TENSION,
                  friction: SPRING_CONFIG.FRICTION,
                }}
                swipeToDismiss={false}
                renderContent={() => (
                  <RenderSwiper data={this._data} curIndex={2} />
                )}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: Helpers.fS(30),
                      fontFamily: DEVICE.fontBold,
                      color: '#ffffff',
                    }}>
                    +{this._photoCount - 3}
                  </Text>
                </View>
              </Lightbox>
            )}
          </View>
        </View>
      );
    } else if (
      this._photoCount >= TYPE_GALARY.THREE_PIC &&
      _randomTypeShow === 3
    ) {
      // 3 photo vertical and square
      return (
        <View
          style={{
            flexDirection: 'column',
            height: DEVICE.width,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Lightbox
            style={{height: '49.5%', width: '100%'}}
            underlayColor={'black'}
            springConfig={{
              tension: SPRING_CONFIG.TENSION,
              friction: SPRING_CONFIG.FRICTION,
            }}
            swipeToDismiss={false}
            renderContent={() => (
              <RenderSwiper data={this._data} curIndex={0} />
            )}>
            <CImage
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent',
              }}
              src={{
                uri:
                  CONFIG.host + this._data[0].thumbnail.sizes.medium_large.path,
              }}
              resizeMode={'cover'}
            />
          </Lightbox>

          <View
            style={{
              flexDirection: 'row',
              height: '49.5%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Lightbox
              style={{height: '100%', width: '49.5%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={1} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[1].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            <Lightbox
              style={{height: '100%', width: '49.5%'}}
              underlayColor={'black'}
              springConfig={{
                tension: SPRING_CONFIG.TENSION,
                friction: SPRING_CONFIG.FRICTION,
              }}
              swipeToDismiss={false}
              renderContent={() => (
                <RenderSwiper data={this._data} curIndex={2} />
              )}>
              <CImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={{
                  uri:
                    CONFIG.host +
                    this._data[2].thumbnail.sizes.medium_large.path,
                }}
                resizeMode={'cover'}
              />
            </Lightbox>

            {this._photoCount > 3 && (
              <Lightbox
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  position: 'absolute',
                  right: 0,
                  height: '100%',
                  width: '49.5%',
                }}
                underlayColor={'black'}
                springConfig={{
                  tension: SPRING_CONFIG.TENSION,
                  friction: SPRING_CONFIG.FRICTION,
                }}
                swipeToDismiss={false}
                renderContent={() => (
                  <RenderSwiper data={this._data} curIndex={2} />
                )}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: Helpers.fS(30),
                      fontFamily: DEVICE.fontBold,
                      color: '#ffffff',
                    }}>
                    +{this._photoCount - 3}
                  </Text>
                </View>
              </Lightbox>
            )}
          </View>
        </View>
      );
    } else {
      // other photo (do nothing)
      return null;
    }
  }
}

/**
 * SWIPER
 */
class RenderSwiper extends React.PureComponent {
  render() {
    return (
      <FlatList
        style={{width: DEVICE.width, height: DEVICE.height}}
        data={this.props.data}
        renderItem={({item, index}) => {
          return (
            <CImage
              src={{
                uri:
                  CONFIG.host + '/' + item.thumbnail.path.replace('assets', ''),
              }}
              resizeMode={'contain'}
              style={{
                height: DEVICE.height,
                width: DEVICE.width,
                zIndex: 0,
              }}
            />
          );
        }}
        getItemLayout={(data, index) => ({
          length: DEVICE.width,
          offset: DEVICE.width * index,
          index,
        })}
        initialScrollIndex={this.props.curIndex}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default ImageGallery;
