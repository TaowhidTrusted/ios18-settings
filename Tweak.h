//
//  Tweak.h
//  iOS18Morph - iOS 18 UI for iOS 16 Rootless
//
//  Created for iOS 16.0-16.7.x (arm64/arm64e)
//

#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>

#pragma mark - CA Continuous Corner Curve

extern NSString *const kCACornerCurveContinuous;

#pragma mark - Material & Visual Effects

@interface MTMaterialView : UIView
+ (instancetype)materialViewWithRecipe:(NSInteger)recipe options:(NSUInteger)options;
@property (nonatomic, assign) CGFloat weighting;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
@end

#pragma mark - ControlCenterUI Forward Declarations

@interface CCUIContentModuleContainerView : UIView
@property (nonatomic, copy) NSString *moduleIdentifier;
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, readonly) MTMaterialView *backgroundMaterialView;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIContentModuleContentContainerView : UIView
@property (nonatomic, readonly) UIView *contentView;
@property (nonatomic, assign) BOOL expanded;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIButtonModuleView : UIControl
@property (nonatomic, strong) UIView *highlightedBackgroundView;
@property (nonatomic, strong) UIImageView *glyphImageView;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIButtonModuleViewController : UIViewController
@property (nonatomic, readonly) CCUIButtonModuleView *buttonView;
@end

@interface CCUIMenuModuleItemView : UIControl
@property (nonatomic, strong) UIView *highlightedBackgroundView;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
@end

@interface CCUIModuleContentMetrics : NSObject
@property (nonatomic, readonly) CGFloat cornerRadius;
@property (nonatomic, readonly) CGFloat moduleWidth;
@property (nonatomic, readonly) CGFloat moduleHeight;
@property (nonatomic, readonly) CGFloat gridCellSize;
@end

@interface CCUIRoundButton : UIControl
@property (nonatomic, readonly) UIView *normalStateBackgroundView;
@property (nonatomic, readonly) UIImageView *glyphImageView;
@property (nonatomic, assign) BOOL useAlternateBackground;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIContinuousSliderView : UIControl
@property (nonatomic, readonly) UIView *valueIndicatorClippingView;
@property (nonatomic, readonly) UIView *backgroundView;
@property (nonatomic, assign) CGFloat value;
@property (nonatomic, assign) CGFloat continuousSliderCornerRadius;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface CCUIModularControlCenterOverlayViewController : UIViewController
@property (nonatomic, readonly) UIView *overlayHeaderView;
@property (nonatomic, readonly) UIScrollView *modularScrollView;
@end

@interface CCUIHeaderPocketView : UIView
@property (nonatomic, strong) UIView *powerButton;
@property (nonatomic, strong) UIView *editAddButton;
@end

#pragma mark - Preferences / Settings Forward Declarations

@interface PSSpecifier : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *identifier;
@property (nonatomic, strong) id target;
@property (nonatomic, strong) NSDictionary *properties;
- (id)propertyForKey:(NSString *)key;
- (void)setProperty:(id)value forKey:(NSString *)key;
@end

@interface PSTableCell : UITableViewCell
@property (nonatomic, strong) PSSpecifier *specifier;
@property (nonatomic, strong) UIImageView *iconImageView;
- (void)_setContinuousCornerRadius:(CGFloat)cornerRadius;
- (void)layoutSubviews;
@end

@interface PSListController : UIViewController <UITableViewDataSource, UITableViewDelegate>
@property (nonatomic, strong) UITableView *table;
@property (nonatomic, strong) NSArray *specifiers;
- (PSSpecifier *)specifier;
- (PSSpecifier *)specifierAtIndex:(NSInteger)index;
- (PSSpecifier *)specifierForID:(NSString *)identifier;
- (void)viewDidLoad;
- (void)viewWillAppear:(BOOL)animated;
- (void)reloadSpecifiers;
@end

@interface PrefsListController : PSListController
@end

#pragma mark - Custom iOS 18 Settings Hero Card View

@interface iOS18SettingsHeroCardView : UIView
@property (nonatomic, strong) UIImageView *iconImageView;
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UILabel *descriptionLabel;
@property (nonatomic, strong) UIVisualEffectView *blurBackgroundView;
- (instancetype)initWithTitle:(NSString *)title description:(NSString *)desc iconName:(NSString *)iconName;
@end
