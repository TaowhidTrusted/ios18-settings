#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

extern NSString *const kCACornerCurveContinuous;

@interface CCUIContentModuleContainerView : UIView
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, readonly) UIView *backgroundMaterialView;
@end

@interface CCUIContentModuleContentContainerView : UIView
@property (nonatomic, readonly) UIView *contentView;
@end

@interface CCUIRoundButton : UIControl
@property (nonatomic, readonly) UIView *normalStateBackgroundView;
@end

@interface CCUIContinuousSliderView : UIControl
@property (nonatomic, readonly) UIView *valueIndicatorClippingView;
@property (nonatomic, readonly) UIView *backgroundView;
@end

@interface CCUIModularControlCenterOverlayViewController : UIViewController
@property (nonatomic, readonly) UIView *overlayHeaderView;
@end

@interface PSSpecifier : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *identifier;
@end

@interface PSTableCell : UITableViewCell
@property (nonatomic, strong) PSSpecifier *specifier;
@property (nonatomic, strong) UIImageView *iconImageView;
@end

@interface PSListController : UIViewController <UITableViewDataSource, UITableViewDelegate>
@property (nonatomic, strong) UITableView *table;
@property (nonatomic, strong) PSSpecifier *specifier;
@end

@interface iOS18SettingsHeroCardView : UIView
- (instancetype)initWithTitle:(NSString *)title description:(NSString *)desc iconName:(NSString *)iconName;
@end
