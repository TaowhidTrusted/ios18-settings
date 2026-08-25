#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

extern NSString *const kCACornerCurveContinuous;

@interface UIView (iOS18Morph)
- (void)_setContinuousCornerRadius:(CGFloat)radius;
- (void)_setCornerRadius:(CGFloat)radius;
@end

@interface CCUIContentModuleContainerView : UIView
@property (nonatomic, copy) NSString *moduleIdentifier;
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, readonly) UIView *backgroundMaterialView;
@end

@interface CCUIContentModuleContentContainerView : UIView
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, assign) BOOL expanded;
@end

@interface CCUIButtonModuleView : UIControl
@property (nonatomic, strong) UIView *highlightedBackgroundView;
@property (nonatomic, strong) UIImageView *glyphImageView;
@end

@interface CCUIRoundButton : UIControl
@property (nonatomic, readonly) UIView *normalStateBackgroundView;
@end

@interface CCUIContinuousSliderView : UIControl
@property (nonatomic, readonly) UIView *valueIndicatorClippingView;
@property (nonatomic, readonly) UIView *backgroundView;
@property (nonatomic, assign) CGFloat continuousSliderCornerRadius;
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
- (PSSpecifier *)specifier;
@end

@interface iOS18SettingsHeroCardView : UIView
- (instancetype)initWithTitle:(NSString *)title description:(NSString *)desc iconName:(NSString *)iconName;
@end
